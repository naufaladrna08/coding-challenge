import { Container, Button, Modal, Form } from "react-bootstrap"
import { useState } from 'react'
import CarForm from "../components/CarForm"
import CarList from "../components/CarList"
import { CarProvider } from "../providers/CarContext"

const Admin = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleClose = () => setShowCreateModal(false)
  const handleShow = () => setShowCreateModal(true)

  return (
    <>
      <CarProvider>
        <Container className="my-4">
          <h1 className="mt-4"> Car List </h1>

          <Button variant="primary" onClick={handleShow}>
            Create
          </Button>

          <CarList />
        </Container>

        <Modal show={showCreateModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Create Data </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CarForm type={ 'create' } />
          </Modal.Body>
        </Modal>
      </CarProvider>
    </>
  )
}

export default Admin