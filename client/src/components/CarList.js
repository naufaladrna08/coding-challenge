import axios from 'axios'
import CarForm from './CarForm'
import { Table, Button, Modal } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import { CarContext, CarContextUpdate } from '../providers/CarContext'

const CarList = ({}) => {
  const cars = useContext(CarContext)
  const setCars = useContext(CarContextUpdate)

  const [updateCarData, setUpdateCarData] = useState({})
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showViewCar, setShowViewCar] = useState(false)
  const [currentViewedCar, setCurrentVieweCar] = useState({})

  const handleClose = () => setShowUpdateModal(false)
  const handleShow = () => setShowUpdateModal(true)
  const handleCloseView = () => setShowViewCar(false)

  const backendURL = axios.defaults.baseURL

  const getCars = async () => {
    try {
      const res = await axios.get('/cars')

      setCars(res.data)
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleView = async (data) => {
    setShowViewCar(true)
    setCurrentVieweCar(data)
  }

  const handleUpdate = async (data) => {
    setUpdateCarData(data)
    handleShow()
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this car?')

    if (!confirm) {
      return false
    }

    try {
      const res = await axios.delete(`/cars/${id}`)

      setCars(cars.filter(car => car.car_id !== id))      
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getCars()
  }, [])

  return ( 
    <>
      <Table className="my-4" striped bordered hover>
        <thead>
          <tr>
            <th> Car Name </th>
            <th> Day Rate </th>
            <th> Month Rate </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
          {
          cars.length > 0 ? (
          cars.map(each => (
            <tr key={each.car_id}>
              <td> {each.car_name} </td>
              <td> {each.day_rate} </td>
              <td> {each.month_rate} </td>
              <td>
                <Button variant="primary" className="mx-1" onClick={ (e) => handleView(each) }> View </Button>
                <Button variant="primary" className="mx-1" onClick={ (e) => handleUpdate(each) }> Update </Button>
                <Button variant="danger"  className="mx-1" onClick={ (e) => handleDelete(each.car_id) }> Delete </Button>
              </td>
            </tr>
          ))) : (
            <tr>
              <td colSpan="4"> No cars found </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={ showUpdateModal } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title> Update Data </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CarForm type={ 'update' } data={ updateCarData } />
        </Modal.Body>
      </Modal>

      <Modal size='lg' show={ showViewCar } onHide={ handleCloseView }>
        <Modal.Header closeButton>
          <Modal.Title> View Data </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
            <div className="col-md-6">
              <div className="row mb-2">
                <div className="col-md-4"> Car Name </div>
                <div className="col-md-8"> { currentViewedCar.car_name } </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4"> Day Rate </div>
                <div className="col-md-8"> ${ currentViewedCar.day_rate } </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4"> Month Rate </div>
                <div className="col-md-8"> ${ currentViewedCar.month_rate } </div>
              </div>
            </div>
            <div className="col-md-6">
              <img src={ backendURL + "/" + currentViewedCar.image } className="img-fluid" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CarList