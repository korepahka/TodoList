import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axiosClient from '../../axios-client'


function EditTodo({level, data, handleChange}) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    handleChange();
    setShow(false)
  };

  const [errors, setErrors] = useState(null);
  const [user, setUsers] = useState([]);



  useEffect(() => {
    if (data) {
        setShow(true);   
        getUsers();
    }
  }, [data]);

  const getUsers = () => {
    axiosClient.get('/users')
      .then(({ data }) => {
        setUsers(data.data)
      })
  }

  const saveTodo = task => {
    if (task.id) {
      axiosClient.put(`/tasks/${task.id}`, task)
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
  }

    const onFormSubmit = e => {
          e.preventDefault()
          saveTodo({
            id: data.id,
            name: e.target[0].value,
            description: e.target[1].value, 
            priority: e.target[2].value, 
            status: e.target[3].value, 
            date_ending: e.target[4].value, 
            creator_id: data.creator_id,
            responsible_id: e.target[6].value
          })
        
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
              <div></div>
              <Form.Control disabled={level === 1} required name="name" type="text" defaultValue={data?.name}/>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Описание</Form.Label>
              <Form.Control disabled={level === 1} required as="textarea" name="description" defaultValue={data?.description}/>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Приоритет</Form.Label>
              <Form.Label>{level}</Form.Label>
                <Form.Select disabled={level === 1}  name="priority" defaultValue={data?.priority}>
                      <option value="1">Высокий</option>
                      <option value="2">Средний</option>
                      <option value="3">Низкий</option>
                  </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Статус</Form.Label>
                <Form.Select  name="status"  defaultValue={data?.status}>
                    <option value="1">К выполнению</option>
                    <option value="2">Выполняется</option>
                    <option value="3">Выполнена</option>
                    <option value="4">Отменена</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Дата окончания</Form.Label>
              <Form.Control disabled={level === 1} required name="date_ending" type="date"  defaultValue={data?.date_ending.split(' ')[0]}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Создатель</Form.Label>
                <Form.Control disabled name="creator_id" defaultValue={data?.creator_name} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Ответсвенный</Form.Label>
                <Form.Select disabled={level === 1} className="form-select" aria-label="Default select example" name="responsible_id"  defaultValue={data?.responsible_id}>
                    {user.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" >
            Save Changes
          </Button>
        </Modal.Footer>
          </Form>
        </Modal.Body>
 
      </Modal>
    </>
  );
}


export default EditTodo;