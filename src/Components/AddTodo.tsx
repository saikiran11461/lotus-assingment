import { Box, Input, Stack } from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import { postTodo } from '../Redux/app/action';
import theme from '../theme';
import { TodoPayload } from '../Redux/app/types';
import { useNavigate } from 'react-router-dom';
const AddTodo = () => {

    const dispatch:ThunkDispatch<{},{},AnyAction> = useDispatch()
    
    const navigate = useNavigate()

    const init: TodoPayload ={
        user:localStorage.getItem("id") || null,
        title:"",
        description:""
    }

    const [formData ,setFormData] = useState<TodoPayload>(init);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;

        setFormData(prev=>({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(postTodo(formData))
        .then(res=>{
            console.log(res.payload.message)
            if(res.payload.message === "postTodo Success"){
                navigate("/")
            }
        })
    }

  return (
    <>
        <Box  width={"40%"} margin={"auto"} mt={"200px"}>
                <form onSubmit={handleSubmit}>
            <Stack spacing='10px'>
                {/* {errorResponse && <Text textAlign={"center"} color={"red"}>{errorResponse}</Text>} */}
                <Input name='title' value={formData.title} onChange={handleChange} type='text' size={"lg"} placeholder='title'/>
                <Input name='description' value={formData.description} onChange={handleChange} type='text' size={"lg"} placeholder='description'/>
                <Input bgColor={theme.colors.teal} color={"white"} type='submit'/>
            </Stack>
                </form>
        </Box>
    </>
  )
}

export default AddTodo