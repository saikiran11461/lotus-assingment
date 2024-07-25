import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import { getTodo } from '../Redux/app/action';
import TodoTable from '../Components/TodoTable';
import {TodoItem} from "../Redux/app/types"
const Todo = () => {
  
  return (
    <>
   <Box width={"90%"} margin={"auto"}>
            <TodoTable/>
   </Box>
    </>
  )
}

export default Todo