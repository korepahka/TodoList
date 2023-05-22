import React, { useEffect, useState } from 'react'
import { Row, Col, Button, ButtonGroup,  DropdownButton, Dropdown }  from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrash, faEdit, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import NewTodo from '../NewTodo/NewTodo'
import EditTodo from '../EditTodo/EditTodo'
import axiosClient from '../../axios-client'
import { useStateContext } from '../../context/ContextProvider'

function TodoList() {
    const [task, setTask] = useState([]);
    const [dataId, setId] = useState();
    const [filtred, setFiltred] = useState(task);
    const [trigger, setTrigger] = useState(0);
    const {user, token, setUser, setToken} = useStateContext();
    const [level, setLevel] = useState(0);

    if (!token) {
        return <Navigate to="/login" />
    }

    let Tdate = new Date();

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
                getTasks(data.admin, data.head_user_id)
                getUsers();
            })

    }, [])

    useEffect(() => {
        setFiltred(task);
    }, [task])

    const getUsers = () => {
        axiosClient.get('/users')
          .then(({ data }) => {
            setLevel(data.data.length)
          })
      }

    const getTasks = (admin, head_user_id) => {

        if (admin === 1 || head_user_id === null) {
            axiosClient.get('/alltasks')
              .then(({ data }) => {
                const task = data.map((d) => { 
                    return Date.parse(d.date_ending) < Tdate.setDate(Tdate.getDate() - 1) < '3' ? {...d, color: 'table-danger'} :
                    d.status == '3' ? {...d, color: 'table-success'} : {...d, color: 'table-secondary'}
                })
                setTask(task);    
              })

        } else {
        axiosClient.get('/tasks')
          .then(({ data }) => {
            const task = data.map((d) => { 
                    return Date.parse(d.date_ending) < Tdate.setDate(Tdate.getDate() - 1) && d.status < '3' ? {...d, color: 'table-danger'} :
                d.status == '3' ? {...d, color: 'table-success'} : {...d, color: 'table-secondary'}
            })
            setTask(task);
          })
        }
      }
      
    function todoFilter(interval) {
       
        let Wdate = new Date().setDate(new Date().getDate() + 7);
        let Mdate = new Date().setMonth(new Date().getMonth() + 1);
        let newTask;

        if (interval === 'today') {
            newTask = task.filter(item => new Date(Date.parse(item.date_ending)).toLocaleDateString("ru-RU") === Tdate.toLocaleDateString("ru-RU"));
            setFiltred(newTask);
        } else if (interval === 'week') {
            newTask = task.filter(item => (Date.parse(item.date_ending) <= Wdate) && (Date.parse(item.date_ending) > Tdate.setDate(Tdate.getDate() - 1)));
            setFiltred(newTask);
        } else if (interval === 'month') {
            newTask = task.filter(item => (Date.parse(item.date_ending) <= Mdate) && (Date.parse(item.date_ending) > Tdate.setDate(Tdate.getDate() - 1)));
            setFiltred(newTask);
        } else {
            setFiltred(task);
         }   

    }

    const onDeleteClick = task => {
        if (!window.confirm("Вы уверены, что хотите удалить запись?")) {
          return
        }
        axiosClient.delete(`/tasks/${task.id}`)
          .then(() => {
            getTasks(user.admin)
          })
      }

    function paramSwitch(param) {
        switch(param) {
            case 1:
                return 'высокий';
            case 2:
                return 'средний';
            case 3:
                return 'низкий';
            default:
                return 'без приоритета';
        }
      };

      function statusSwitch(param) {
        switch(param) {
            case 1:
                return 'к выполнению';
            case 2:
                return 'выполняется';
            case 3:
                return 'выполнена';
            case 4:
                return 'отменена';
            default:
                return 'без статуса';
        }
      };

      const parentHandleChange = () => {
        getTasks(user.admin);
        setId(null);
      };

      const setUpdate = (data) => {
        setId(data);
        }

        const sortData = (field) => {
            const copyData = filtred.concat();
            const sortData = copyData.sort((a, b) =>
                {return a[field] > b[field] ? 1 : -1})
            console.log(sortData)
            setFiltred(sortData);
        }

      return (
        <>
            <ButtonGroup aria-label="Basic example">
                <Button variant="primary" onClick={() => {setTrigger((trigger) => trigger + 1)}}>Новая задача</Button>
            </ButtonGroup>
            <br></br>
            <div  role="group" aria-label="Basic example">
                <button className="btn btn-secondary" type="button" onClick={()=>todoFilter('all')}>все</button>
                <button className="btn btn-secondary" type="button" onClick={()=>todoFilter('today')}>на сегодня</button>
                <button className="btn btn-secondary" type="button" onClick={()=>todoFilter('week')}>на неделю</button>
                <button className="btn btn-secondary" type="button" onClick={()=>todoFilter('month')}>на месяц</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Заголовок</th>
                        <th scope="col">Описание</th>
                        <th scope="col" onClick={() => {sortData('date_ending')}}>Дата окончания</th>
                        <th scope="col">Приоритет</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Создатель</th>
                        <th scope="col" onClick={() => {sortData('responsible_name')}}>Ответсвенный</th>
                        <th scope="col"></th>
                        </tr>
                </thead>
                
                        <tbody>
                                { 
                                    filtred.map((t) => (
                                        <tr key={t.id} className={t.color}>
                                            <th scope="row">{t.name}</th>
                                            <td>{t.description}</td>
                                            <td>{new Date(Date.parse(t.date_ending)).toLocaleDateString("ru-RU")}</td>
                                            <td>
                                                {paramSwitch(t.priority)}
                                            </td>
                                            <td>
                                                {statusSwitch(t.status)}
                                            </td>
                                            <td>{t.creator_name}</td>
                                            <td>{t.responsible_name}</td>
                                            <td>
                                                <Button disabled={level === 1}  onClick={ev => onDeleteClick(t)} size="sm"><FontAwesomeIcon icon={ faTrash } /></Button>
                                                <Button onClick={() => setUpdate(t) } size="sm"><FontAwesomeIcon icon={ faEdit } /></Button>
                                            </td>
                                        </tr>
                                    ))
                                 }
                         </tbody>
                
           </table>

            <NewTodo  handleChange={parentHandleChange} trigger={trigger}/>

            <EditTodo handleChange={parentHandleChange} data={dataId} level={level}/>
           
        </>
    )

}

export default TodoList

