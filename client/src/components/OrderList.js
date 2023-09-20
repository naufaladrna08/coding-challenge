import axios from 'axios'
import CarForm from './CarForm'
import { Table, Button, Modal } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import { OrderContext, OrderContextUpdate } from '../providers/OrderContext'
import OrderForm from './OrderForm'

const OrderList = ({}) => {
  const orders = useContext(OrderContext)
  const setOrders = useContext(OrderContextUpdate)
  const backendURL = axios.defaults.baseURL

  const [updatOrderData, setUpdateOrderData] = useState({})
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showViewOrder, setShowViewOrder] = useState(false)
  const [currentViewedOrder, setCurrentViewedOrder] = useState({})

  const handleShow = () => setShowUpdateModal(true)
  const handleClose = () => setShowUpdateModal(false)
  const handleCloseView = () => setShowViewOrder(false)

  const getOrders = async () => {
    try {
      const res = await axios.get('/orders')

      setOrders(res.data)
    } catch (err) {
      console.error(err.message)
    }
  }
  
  const handleView = async (data) => {
    setShowViewOrder(true)
    setCurrentViewedOrder(data)
    console.log(data)
  }

  const handleUpdate = async (data) => {
    setUpdateOrderData(data)
    handleShow()
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this order?')

    if (!confirm) {
      return false
    }

    try {
      await axios.delete(`/orders/${id}`)

      setOrders(orders.filter(each => each.order_id !== id))
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return ( 
    <>
      <Table className="my-4" striped bordered hover>
        <thead>
          <tr>
            <th> Order ID </th>
            <th> Car Name </th>
            <th> Order Date </th>
            <th> Pickup Date </th>
            <th> Drop Off Date </th>
            <th> Pickup Location </th>
            <th> Drop Off Location </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
          {
          orders.length > 0 ? (
            orders.map(each => (
            <tr key={each.order_id}>
              <td> {each.order_id} </td>
              <td> {each.car_name} </td>
              <td> {each.order_date} </td>
              <td> {each.pickup_date} </td>
              <td> {each.dropoff_date} </td>
              <td> {each.pickup_location} </td>
              <td> {each.dropoff_location} </td>
              <td>
                <Button variant="primary" size='sm' onClick={ (e) => handleView(each) }> View Data </Button>
                <Button variant="primary" size='sm' onClick={ (e) => handleUpdate(each) }> Update </Button> 
                <Button variant="danger"  size='sm' onClick={ (e) => handleDelete(each.order_id) }> Delete </Button>
              </td>
            </tr>
          ))) : (
            <tr>
              <td colSpan="7"> No orders found </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={ showUpdateModal } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title> Update Order </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderForm type={ 'update' } data={ updatOrderData } />
        </Modal.Body>
      </Modal>

      <Modal size='lg' show={ showViewOrder } onHide={ handleCloseView }>
        <Modal.Header closeButton>
          <Modal.Title> View Order </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="row mb-2">
                <div className="col-md-4"> Car Name </div>
                <div className="col-md-8"> { currentViewedOrder.car_name } </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4"> Order Data </div>
                <div className="col-md-8"> { currentViewedOrder.order_date } </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4"> Pickup Date </div>
                <div className="col-md-8"> { currentViewedOrder.pickup_date } </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4"> Drop Off date </div>
                <div className="col-md-8"> { currentViewedOrder.dropoff_date } </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4"> Pickup Location </div>
                <div className="col-md-8"> { currentViewedOrder.pickup_location } </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4"> Drop Off Location </div>
                <div className="col-md-8"> { currentViewedOrder.dropoff_location } </div>
              </div>
            </div>
            <div className="col-md-6">
              <img src={ backendURL + "/" + currentViewedOrder.image } className="img-fluid" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default OrderList