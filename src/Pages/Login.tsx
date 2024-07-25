import { Box, Input, Stack ,Text} from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import theme from "../theme"
import {  FormDataLogin} from '../Redux/auth/types'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import { postLogin } from '../Redux/auth/action'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const dispatch:ThunkDispatch<{}, {}, AnyAction> = useDispatch();
    const navigate = useNavigate()
  
    const init:FormDataLogin={
        email:"",
        password:"",
    }

    const [formData, setFormData] = useState<FormDataLogin>(init);
    const [errorResponse,setErrorResponse] = useState<String>("")

    const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;

        setFormData(prev=>({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit =  (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
          dispatch(postLogin(formData))
          .then(res=>{
            console.log("res", res);
            if(res?.payload?.response?.data?.message){
                setErrorResponse(res?.payload?.response?.data?.message)
            }
            if(res?.payload?.message === "login success"){
                localStorage.setItem("id",res?.payload?.id)
                localStorage.setItem("token",res?.payload?.token);
                navigate("/")
            }
    
          })
          
    };
    
  return (
    <>
         <Box  width={"40%"} margin={"auto"} mt={"200px"}>
                <form onSubmit={handleSubmit}>
            <Stack spacing='10px'>
                {errorResponse && <Text textAlign={"center"} color={"red"}>{errorResponse}</Text>}
                <Input name='email' value={formData.email} onChange={handleChange} type='email' size={"lg"} placeholder='email'/>
                <Input name='password' value={formData.password} onChange={handleChange} type='password' size={"lg"} placeholder='password'/>
                <Input bgColor={theme.colors.teal} color={"white"} type='submit'/>
            </Stack>
                </form>
        </Box>
    </>
  )
}

export default Login