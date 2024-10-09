import axios from "axios";

async function getAllTodoList()
{
    const response = await axios.get(
        String(process.env.REACT_APP_BASE_API_URL) + 
        String(process.env.REACT_APP_ENDPOINT_ALL_ITEMS)
    );

    return response.data;
}

async function getTodoItemDetail(id: any)
{
    const response = await axios.get(
        String(process.env.REACT_APP_BASE_API_URL) + 
        `/todo/${id}`
    );
    
    return response.data;
}

async function deleteTodoItem(id: number)
{
    const response = await axios.delete(
        String(process.env.REACT_APP_BASE_API_URL) + 
        `/todo/${id}`
    );
    
    return response.data;
}

async function addTodoItem(data: any)
{
    const response = await axios.post(
        String(process.env.REACT_APP_BASE_API_URL) + 
        `/todo`,
        data
    );
    
    return response.data;
}

async function updateTodoItem(id: number, data: any)
{
    const response = await axios.put(
        String(process.env.REACT_APP_BASE_API_URL) + 
        `/todo/${id}`,
        data
    );
    
    return response.data;
}


export {
    getAllTodoList,
    getTodoItemDetail,
    deleteTodoItem,
    addTodoItem,
    updateTodoItem,
}