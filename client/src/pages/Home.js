import { Container, Button, Modal } from "react-bootstrap"
import { useState } from "react"
import { OrderProvider } from "../providers/OrderContext"
import OrderList from "../components/OrderList"
import OrderForm from "../components/OrderForm"


const Home = () => {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  return (
    <OrderProvider>
      <Container className="my-4">
        <h1 className="mt-4"> Orders </h1>

        <Button variant="primary" onClick={handleShow}>
          Create
        </Button>

        <OrderList />

      </Container>

      <Modal show={ showModal } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title> Create Data </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderForm type={ 'create' } />
        </Modal.Body>
      </Modal>
    </OrderProvider>
  )
}

export default Home