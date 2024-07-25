import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Register from '../Pages/Register'
import Login from '../Pages/Login'
import { Box } from '@chakra-ui/react'
import AddTodo from '../Components/AddTodo'
import Private from '../Private/Private'
import EditTodo from '../Components/EditTodo'

const AllRoutes = () => {
  return (
    <>
   <Box width={["","","","","90%"]} margin={"auto"}>
   <Routes>
        <Route path='/' element={<Private><Home/></Private>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/addTodo' element={<Private><AddTodo/></Private>} />
        <Route path='/todo/:id' element={<Private><EditTodo/></Private>} />
    </Routes>
   </Box>
    </>
  )
}

export default AllRoutes