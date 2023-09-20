const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const multer = require('multer')
const fs = require('fs')

const port = 5000

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

/* Serve static files from the "uploads" folder */
app.use('/uploads', express.static('uploads'))

// CREATE
app.post('/cars', upload.single('image'), async (req, res) => {
  try {
    const { car_name, day_rate, month_rate } = req.body
    const uploadedImage = req.file

    if (!uploadedImage) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Generate nama unik
    const uniqueFileName = `${Date.now()}-${uploadedImage.originalname}`;

    // Path ke folder uploads
    const imagePath = `uploads/${uniqueFileName}`;

    // Simpan gambar ke image path
    fs.writeFileSync(imagePath, uploadedImage.buffer);

    const newCar = await pool.query(
      'INSERT INTO cars (car_name, day_rate, month_rate, image) VALUES ($1, $2, $3, $4) RETURNING *',
      [car_name, day_rate, month_rate, imagePath]
    )

    res.status(200).json(newCar.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// READ ALL
app.get('/cars', async (req, res) => {
  try {
    const allCars = await pool.query('SELECT * FROM cars')

    res.status(200).json(allCars.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// READ ID
app.get('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params
    const car = await pool.query('SELECT * FROM cars WHERE car_id = $1', [id])
    
    res.status(200).json(car.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// UPDATE
app.put('/cars/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params
    const { car_name, day_rate, month_rate } = req.body
    const uploadedImage = req.file

    if (!uploadedImage) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Generate nama unik
    const uniqueFileName = `${Date.now()}-${uploadedImage.originalname}`;

    // Path ke folder uploads
    const imagePath = `uploads/${uniqueFileName}`;

    // Simpan gambar ke image path
    fs.writeFileSync(imagePath, uploadedImage.buffer);

    const updateCar = await pool.query(
      'UPDATE cars SET car_name = $1, day_rate = $2, month_rate = $3, image = $4 WHERE car_id = $5 RETURNING *',
      [car_name, day_rate, month_rate, imagePath, id]
    )

    res.status(200).json({
      message: 'Car has been updated!',
      data: updateCar.rows[0]
    })
  } catch (err) {
    console.error(err.message)
  }
})

// DELETE
app.delete('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params

    // delete car and all orders related to it
    await pool.query(
      'DELETE FROM cars WHERE car_id = $1',
      [id]
    )

    await pool.query(
      'DELETE FROM orders WHERE car_id = $1',
      [id]
    )
    
    res.status(200).json({
      message: 'Car has been deleted!',
    })
  } catch (err) {
    console.error(err.message)
  }
})

// CRUD ORDERS 
app.post('/orders', async (req, res) => {
  try {
    const { car_id, order_date, pickup_date, dropoff_date, pickup_location, dropoff_location } = req.body
    const newOrder = await pool.query(
      'INSERT INTO orders (car_id, order_date, pickup_date, dropoff_date, pickup_location, dropoff_location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [car_id, order_date, pickup_date, dropoff_date, pickup_location, dropoff_location]
    )

    res.status(200).json(newOrder.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/orders', async (req, res) => {
  try {
    const allOrders = await pool.query(
      'SELECT orders.order_id, cars.car_name, cars.image , orders.order_date, orders.pickup_date, orders.dropoff_date, orders.pickup_location, orders.dropoff_location FROM orders INNER JOIN cars ON orders.car_id = cars.car_id'
    )

    res.status(200).json(allOrders.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params
    const order = await pool.query('SELECT * FROM orders WHERE order_id = $1', [id])

    res.status(200).json(order.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

app.put('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { car_id, order_date, pickup_date, dropoff_date, pickup_location, dropoff_location } = req.body
    const updateOrder = await pool.query(
      'UPDATE orders SET car_id = $1, order_date = $2, pickup_date = $3, dropoff_date = $4, pickup_location = $5, dropoff_location = $6 WHERE order_id = $7 RETURNING *',
      [car_id, order_date, pickup_date, dropoff_date, pickup_location, dropoff_location, id]
    )

    res.status(200).json({
      message: 'Order has been updated!',
      data: updateOrder.rows[0]
    })
  } catch (err) {
    console.error(err.message)
  }
})

app.delete('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteOrder = await pool.query(
      'DELETE FROM orders WHERE order_id = $1',
      [id]
    )

    res.status(200).json({
      message: 'Order has been deleted!',
      data: deleteOrder.rows[0]
    })
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/unordercars', async (req, res) => {
  try {
    const unorderCars = await pool.query(
      'SELECT * FROM cars WHERE car_id NOT IN (SELECT car_id FROM orders)'
    )

    res.status(200).json(unorderCars.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))