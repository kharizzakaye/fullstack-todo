import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import TodoList from './pages/TodoList';
import TodoDetail from './pages/TodoDetail';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <TodoList /> } />
          <Route path={process.env.REACT_APP_URL_ITEM_DETAIL} element={<TodoDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
