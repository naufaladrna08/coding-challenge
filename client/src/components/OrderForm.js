import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"

const toDateInput = (date) => {
  const newDate = new Date(date).toISOString().substring(0, 10)
  return newDate
}

const OrderForm = ({ type, data }) => {
  const [cars, setCars] = useState([])
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    order_id: type === 'update' ? data.order_id : 0,
    car_id: type === 'update' ? data.car_id : 0,
    car_name: type === 'update' ? data.car_name : 0,
    order_date: type === 'update' ? toDateInput(data.order_date) : toDateInput(new Date()),
    pickup_date: type === 'update' ? toDateInput(data.pickup_date) : toDateInput(new Date()),
    dropoff_date: type === 'update' ? toDateInput(data.dropoff_date) : toDateInput(new Date()),
    pickup_location: type === 'update' ? data.pickup_location : '',
    dropoff_location: type === 'update' ? data.dropoff_location : '',
  })

  /** 
   * Butuh data cars untuk dijadikan pilihan di form
   */
  const getCars = async () => {
    try {
      const res = await axios.get('/unordercars')

      if (res.data.length === 0 && type === 'create') {
        setError('No cars available')
      }

      setCars(res.data)
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    try {
      await axios.post('/orders', formData)
      window.location.reload()
    } catch (err) {
      console.error(err.message)
      setError(err.message)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`/orders/${formData.order_id}`, formData)
      window.location.reload()
    } catch (err) {
      console.error(err.message)
      setError(err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // form validation
    if (!formData.car_id || !formData.order_date || !formData.pickup_date || !formData.dropoff_date || !formData.pickup_location || !formData.dropoff_location) {
      setError('Please fill all fields')
    }

    switch (type) {
      case 'create':
        await handleCreate(e)
        break;
      case 'update':
        await handleUpdate(e)
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    getCars()
  }, [])

  return (
    <Form onSubmit={ handleSubmit }>
      <Form.Group className="mb-3">
        <Form.Label> Car Name </Form.Label>
        <Form.Select onChange={ (e) => setFormData({ ...formData, car_id: e.target.value }) }>
          {
            type == 'update' ? (
              <option value={ formData.car_id }> { formData.car_name } </option>
            ) : (
              <option value={ 0 }> Choose Car </option>
            )
          }
          {
            cars.map(each => (
              <option key={ each.car_id } value={ each.car_id }> { each.car_name } </option>
            ))
          }
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label> Order Date </Form.Label>
        <Form.Control type="date" placeholder="Order Date" value={ formData.order_date } onChange={e => setFormData({...formData, order_date: e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label> Pickup Date </Form.Label>
        <Form.Control type="date" placeholder="Pickup Date" value={ formData.pickup_date } onChange={e => setFormData({...formData, pickup_date: e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label> Drop Off Date </Form.Label>
        <Form.Control type="date" placeholder="Drop Off Date" value={ formData.dropoff_date } onChange={e => setFormData({...formData, dropoff_date: e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label> Pickup Location </Form.Label>
        <Form.Control type="text" placeholder="Pickup Location" value={ formData.pickup_location } onChange={e => setFormData({...formData, pickup_location: e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label> Drop Off Location </Form.Label>
        <Form.Control type="text" placeholder="Drop Off Location" value={ formData.dropoff_location } onChange={e => setFormData({...formData, dropoff_location: e.target.value})} />
      </Form.Group>
      

      { error && <p className="text-danger"> { error } </p> }

      <Button 
        className="float-end" 
        variant="primary" 
        type="Update"
      >
        Submit
      </Button>
    </Form>
  )
}

export default OrderForm