import { Box, Input, Stack } from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import theme from '../theme'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { EditTodoPayload, RouteParams } from '../Redux/app/types'
import { getSingleTodo, getTodo, patchTodo } from '../Redux/app/action'
import { PulseLoader } from 'react-spinners'
const EditTodo = () => {
    const { id } = useParams();
  const loading = useSelector((store: any) => store.appReducer.isLoading)

    const navigate = useNavigate()
   
    const dispatch:ThunkDispatch<{},{},AnyAction> = useDispatch();

    const init:EditTodoPayload ={
        title:"",
        description:""
    }
    
    const [formData,setFromData] = useState<EditTodoPayload>(init)

    useEffect(()=>{
        dispatch(getSingleTodo(id as string))
        .then(res=>{
            setFromData(res?.payload?.Todo)
        })
    },[id])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
       const {name,value} =e.target;
       setFromData(prev=>({
        ...prev,
         [name]:value
       }))
    }

    const handleSubmit =(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        dispatch(patchTodo(id as string,formData))
        .then(res=>{
            console.log(res)
            if(res?.payload?.message === "patchTodo Success"){
                console.log("yes")
                navigate("/")
            }
        })
    }

  return (
    <>
        <Box width={"40%"} margin={"auto"} mt={"200px"}>
        {loading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bg="rgba(255, 255, 255, 0.8)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={9999}
        >
          <PulseLoader color="#00aaff" />
        </Box>
      )}
            <form onSubmit={handleSubmit}>
                <Stack spacing={"10px"}>
                    <Input name='title' value={formData.title ? formData.title : ""} onChange={handleChange} type='text' placeholder="title"/>
                    <Input name='description' value={formData.description ? formData.description : ""} onChange={handleChange} type='text' placeholder='Description'/>
                    <Input bgColor={theme.colors.teal} color={"white"} type='submit'/>
                </Stack>
            </form>
        </Box>
    </>
  )
}

export default EditTodo