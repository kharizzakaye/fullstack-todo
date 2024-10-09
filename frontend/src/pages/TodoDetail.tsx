import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as apiService from "../services/apiService";
import { Button, Container, Form } from 'react-bootstrap';
import  axios  from "axios";

const TodoDetail = () => {
  const navigate = useNavigate();
  const [todoData, setTodoData] = useState<any>(null);
  const location = useLocation()
  const [itemID, setItemID] = useState<any>(null);

  const onBackHandler = () => {
    navigate("/");
  }

  async function getTodoDetail()
  {
    if (location.search == null || location.search == "")
    {

    }
    else
    {
      setItemID(location.search.split("=")[1]);

      const getTodoItem: any = await apiService.getTodoItemDetail(location.search.split("=")[1]);
      setTodoData(getTodoItem[0]);
    }

    
  }

  useEffect(() => {
    getTodoDetail();
  }, [])

  const handleChange = (e: any) => {
    setTodoData((prev: any) => ({ ...prev, [e.target.name] : e.target.value }))
  }

  const handleClick = async (e: any) => {
    e.preventDefault();

    try
    {
      if (itemID)
      {
        const updateTodoItem: any = await apiService.updateTodoItem(itemID, todoData);
      }
      else
      {
        const addTodoItem: any = await apiService.addTodoItem(todoData);
      }

      navigate("/")
    }
    catch(err)
    {
        console.error(err);
    }
  }

  return (
    <>
        { (!itemID || (itemID && todoData)) &&
            <Container className='text-center'>
                <h1 className='text-center mt-4 mb-4'>Book Details</h1>

                <Button className='btn-primary mb-4' onClick={onBackHandler} >Back</Button>
                <Button className='btn-success mb-4' onClick={handleClick}>Save</Button>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' value={todoData?.title || ""} required onChange={handleChange}/>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name='desc' value={todoData?.desc || ""} required onChange={handleChange}/>
                  </Form.Group>
                </Form>
            </Container>
        }
    </>
)
}

export default TodoDetail