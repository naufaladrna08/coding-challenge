import axios from 'axios'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useState } from 'react'

const CarForm = ({ type, data }) => {
  const [file, setFiles] = useState()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    id: type === 'update' ? data.car_id : '',
    car_name: type === 'update' ? data.car_name : '',
    day_rate: type === 'update' ? data.day_rate : '',
    month_rate: type === 'update' ? data.month_rate : ''
  })
  
  const handleFileChanged = (e) => {
    const newFile = e.target.files[0]
    setFiles(newFile)
  }

  /*
   * Action to create data
   */
  const handleCreate = async (form) => {
    const res = await axios.post('/cars', form, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    window.location.reload()
  }

  /*
   * Action to update data
   */
  const handleUpdate = async (form) => {
    const res = await axios.put(`/cars/${formData.id}`, form, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    window.location.reload()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    /* File and fields validation */
    if (!file) {
      setError('Please select an image to upload')

      return false 
    }

    if (!formData.car_name || !formData.day_rate || !formData.month_rate) {
      setError('Please fill all fields')

      return false
    }

    /* Create FormData */
    const form = new FormData()

    form.append('image', file)

    for (const key in formData) {
      form.append(key, formData[key])
    }

    try {
      switch (type) {
        case 'create':
          await handleCreate(form)
          break
        case 'update':
          await handleUpdate(form)
          break
        
        default:
          break
      }

    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <Form onSubmit={ handleSubmit }>
      <Form.Group className="mb-3">
        <Form.Label> Car Name </Form.Label>
        <Form.Control type="text" placeholder="Avanza" value={ formData.car_name } onChange={e => setFormData({...formData, car_name: e.target.value})} />
      </Form.Group>    
      <Form.Group className="mb-3">
        <Form.Label> Day Rate </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="2.99" value={ formData.day_rate } onChange={e => setFormData({...formData, day_rate: e.target.value})} />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label> Month Rate </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type="number" placeholder="30.99" value={ formData.month_rate } onChange={e => setFormData({...formData, month_rate: e.target.value})} />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label> Image </Form.Label>
        <Form.Control type="file" onChange={ handleFileChanged } accept="image/png, image/gif, image/jpeg" />
      </Form.Group>
      
      {/* Preview Image */}
      { file && <img src={ URL.createObjectURL(file) } alt="preview" className="img-fluid mb-3" /> }

      {/* Display error message */}
      { error && <p className="text-danger"> { error } </p> }

      <Button className="float-end" variant="primary" type="submit">
        Create
      </Button>
    </Form>
  )
}

export default CarForm