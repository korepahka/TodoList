import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axiosClient from '../../axios-client'
import { useStateContext } from '../../context/ContextProvider';


function NewTodo({trigger, handleChange}) {
  const {user, token, setUser, setToken} = useStateContext()

  if (!token) {
      return <Navigate to="/login" />
  }

  const [show, setShow] = useState(false);
  const handleClose = () => {
    handleChange();
    setShow(false)
  };
  const [errors, setErrors] = useState(null);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    if (trigger) {
        setShow(true);
        getUsers();
   
    }
  }, [trigger]);

  useEffect(() => {
    axiosClient.get('/user')
        .then(({data}) => {
          setUser(data)
        })
        
}, [])

  const getUsers = () => {
    axiosClient.get('/users')
      .then(({ data }) => {
        setUsers(data.data)
      })
  }

  const saveTodo = tasks => {
      axiosClient.post('/tasks', tasks)
        .then(() => {
          handleClose();
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }

      const onFormSubmit = e => {
            e.preventDefault()
            saveTodo({
              name: e.target[0].value,
              description: e.target[1].value, 
              priority: e.target[2].value, 
              status: e.target[3].value, 
              date_ending: e.target[4].value, 
              creator_id: user.id,
              responsible_id: e.target[6].value
            })
            console.log(e.target[6].value)
          }
        
  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Новая задача</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label >Заголовок</Form.Label>
              <Form.Control required name="name" type="text"/>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Описание</Form.Label>
              <Form.Control required as="textarea" name="description"/>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Приоритет</Form.Label>
                <Form.Select  name="priority">
                      <option value="1">Высокий</option>
                      <option value="2">Средний</option>
                      <option value="3">Низкий</option>
                  </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Статус</Form.Label>
                <Form.Select  name="status">
                    <option value="1">К выполнению</option>
                    <option value="2">Выполняется</option>
                    <option value="3">Выполнена</option>
                    <option value="4">Отменена</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Дата окончания</Form.Label>
              <Form.Control required name="date_ending" type="date"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Создатель</Form.Label>
                <Form.Control disabled  name="creator_id" defaultValue={user.name} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Ответсвенный</Form.Label>
                <Form.Select className="form-select" aria-label="Default select example" name="responsible_id">
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
          </Form>
        </Modal.Body>
 
      </Modal>
    </>
  );
}


export default NewTodo;