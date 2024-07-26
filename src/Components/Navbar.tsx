import { Box, Button, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import theme from "../theme"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Navbar = () => {
  const auth  = useSelector((store:any)=>store.authReducer.auth);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login")
  }
  useEffect(()=>{

  },[auth,token])
  
  return (
    <>
        <Box  boxShadow='outline' p='6' rounded='md' bg='white' width={["","","","","90%"]} margin={"auto"} mt={"10px"}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Box><Heading color={theme.colors.teal}>TodoApp</Heading></Box>
                <Box display={"flex"}>
                    <Link to={"/register"}><Button display={auth === true ? "none":"block"} mr={"10px"} color={theme.colors.teal} p={"12px 30px"}>Register</Button></Link>
                    {
                      auth ?  <Button onClick={handleLogout} color={theme.colors.teal} p={"12px 30px"}>LogOut</Button>: <Link to={"/login"}><Button color={theme.colors.teal} p={"12px 30px"}>Login</Button></Link>
                    }
                   
                   
                </Box>
            </Box>
        </Box>
    </>
  )
}

export default Navbar