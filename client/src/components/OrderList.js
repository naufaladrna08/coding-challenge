import axios from 'axios'
import CarForm from './CarForm'
import { Table, Button, Modal } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import { OrderContext, OrderContextUpdate } from '../providers/OrderContext'
import OrderForm from './OrderForm'

const OrderList = ({}) => {
  const orders = useContext(OrderContext)
  const setOrders = useContext(OrderContextUpdate)

  const [updatOrderData, setUpdateOrderData] = useState({})
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const handleClose = () => setShowUpdateModal(false);
  const handleShow = () => setShowUpdateModal(true);

  const getOrders = async () => {
    try {
      const res = await axios.get('/orders')

      setOrders(res.data)
    } catch (err) {
      console.error(err.message)
    }
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
                <Button variant="primary" onClick={ (e) => handleUpdate(each) }> Update </Button>
                <Button variant="danger" className="mx-2" onClick={ (e) => handleDelete(each.order_id) }> Delete </Button>
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
    </>
  )
}

export default OrderList