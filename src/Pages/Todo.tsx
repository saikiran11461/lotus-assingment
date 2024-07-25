import { Box } from '@chakra-ui/react'
import React from 'react'

import TodoTable from '../Components/TodoTable';

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