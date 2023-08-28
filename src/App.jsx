import './App.css'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'

const App = () => {
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState([])

  const handleInputChange = (event) => {
    setNewItem(event.target.value)
  }

  const addNews = () => {
    if (newItem !== '') {
      const updatedItems = [...items, { text: newItem, checked: false }];
      setItems(updatedItems);
      setNewItem('');
      localStorage.setItem('items', JSON.stringify(updatedItems));
    }
  }

  const handleEdit = (index) => {
    Swal.fire({
      title: 'Edit Item',
      input: 'text',
      inputValue: items[index].text,
      showCancelButton: true,
      confirmButtonText: 'Edit',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = [...items];
        updatedItems[index].text = result.value;
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
      }
    });
  }

  const handleDelete = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
      }
    });
  }

  const handleCheckboxChange = (index) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  }

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  return (
    <>
      <Container>
        <Row className='justify-content-center'>
          <Col xs={12} lg={8} className='text-start'>
            <h1 className='text-center'>Todo App</h1>
            <Row className='justify-content-center align-items-center mt-5'>
              <Col xs={12} lg={10} >
                <Form.Control placeholder="Add new todo items!" 
                  id="new-items"
                  value={newItem}
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={12} lg={2} className='mt-3 mt-lg-0'>
                <Button className='w-100 btn-add' onClick={addNews}>
                  Add Items!
                </Button>
              </Col>
            </Row>
            <div className='mt-3'>
              {items.map((item, index) => (
                <div className={`items ${item.checked ? 'checked' : ''}`} key={index}>
                  <Row>
                    <Col>
                      <input
                        type='checkbox'
                        checked={item.checked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <span className='ms-2'>{item.text}</span>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                      <Button onClick={() => handleEdit(index)} className='btn-edit'>Edit</Button>
                      <Button className='ms-3 btn-del' onClick={() => handleDelete(index)}>Delete</Button>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App;
