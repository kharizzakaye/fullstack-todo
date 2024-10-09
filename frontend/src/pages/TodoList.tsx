import React, { useEffect, useState } from 'react'
import * as apiService from "../services/apiService";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import "../styles/main.css";
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const TodoList = () => {

    const [todoList, setTodoList] = useState<any[]>([]);
    const navigate = useNavigate();

    async function getAllTodoList()
    {
        const getAllTodoList: any = await apiService.getAllTodoList();
        setTodoList(getAllTodoList);
    }

    async function deleteTask(id: number)
    {
        try
        {
            const deleteTask: any = await apiService.deleteTodoItem(id);

            console.log(deleteTask)
        }
        catch (err: any)
        {
            console.error(err)
        }

        getAllTodoList();
    }

    useEffect(() => {
        getAllTodoList();
    }, [])

    const onAddHandler = () => {
        navigate("/detail");
      }

      const onUpdateHandler = (id: any) => {
        navigate(`/detail?id=${id}`);
      }

    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">To do List</Navbar.Brand>

                    <div className="d-flex">
                        <Button className='btn-warning' onClick={onAddHandler} >
                            Add New Task
                        </Button>
                    </div>
                </Container>
            </Navbar>

            { todoList &&
                <Container className='mt-4'>
                    <Row xl={4} lg={3} md={2} sm={2} xs={1} className="g-4" >
                        { todoList.map((item: any, index: any) => (
                            <Col key={index}>
                                <Card className="p-0 h-100 border-0 card-shadow text-center">
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        
                                        <Card.Text>
                                            { item.desc }
                                        </Card.Text>

                                    </Card.Body>
                                    <Card.Footer>
                                        <Button className='btn-primary' onClick={() => onUpdateHandler(item.id)}>Update</Button>
                                        <Button className='btn-danger' onClick={() => deleteTask(item.id)}>Delete</Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    
                </Container>
            }
        </>
    )
}

export default TodoList;