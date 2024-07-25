import { Box, Input, Stack,Text } from '@chakra-ui/react'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import theme  from "../theme"
import { useDispatch } from 'react-redux'
import { postRegister } from '../Redux/auth/action'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { FormData } from '../Redux/auth/types'
const Register = () => {

    const dispatch:ThunkDispatch<{}, {}, AnyAction> = useDispatch();

    const init:FormData={
        name:"",
        email:"",
        password:""
    }
  
    const [formData,setFormData] = useState<FormData>(init);
    const [errorResponse,setErrorResponse] = useState<String>("")

    const handleChange= (e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;

        setFormData(prev=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(formData)
        dispatch(postRegister(formData))
        .then((res)=>{
            console.log(res?.payload?.response?.data?.message)
            if(res?.payload?.response?.data?.message === 'user already exist'){
                setErrorResponse(res?.payload?.response?.data?.message)
            }
        })
    }

  return (
    <>
        <Box  width={"40%"} margin={"auto"} mt={"200px"}>
               <form onSubmit={handleSubmit}>
            <Stack spacing={"10px"}>
                {errorResponse && <Text color={"red"} textAlign={"center"}>{errorResponse}</Text>}
               <Input name='name' value={formData.name} onChange={handleChange}  type='text' size={"lg"} placeholder='name'/>
                <Input name='email' value={formData.email} onChange={handleChange} type='email' size={"lg"} placeholder='email'/>
                <Input name='password' value={formData.password} onChange={handleChange} type='password' size={"lg"} placeholder='password'/>
                <Input bgColor={theme.colors.teal} color={"white"} type='submit'/>
            </Stack>
               </form>
        </Box>
    </>
  )
}

export default Register