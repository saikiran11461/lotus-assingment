import { Box, Input, Stack, Text, Button } from '@chakra-ui/react';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import theme from "../theme";
import { useDispatch } from 'react-redux';
import { postRegister } from '../Redux/auth/action';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { FormData } from '../Redux/auth/types';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
    const navigate = useNavigate()
    const init: FormData = {
        name: "",
        email: "",
        password: ""
    };

    const [formData, setFormData] = useState<FormData>(init);
    const [errorResponse, setErrorResponse] = useState<string>("");
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const newErrors: Partial<FormData> = {};

        if (!formData.name) {
            newErrors.name = "Name is required";
        }
        if (!formData.email) {
            newErrors.email = "Email is required";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return; 
        }

        dispatch(postRegister(formData))
            .then(res => {
                if (res?.payload?.response?.data?.message === 'user already exist') {
                    setErrorResponse(res?.payload?.response?.data?.message);
                }
                if (res?.payload?.message === "Sign up successful") {
                  
                    navigate("/");
                }

            });

    };

    return (
        <Box width={"40%"} margin={"auto"} mt={"200px"}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={"10px"}>
                    {errorResponse && <Text color={"red"} textAlign={"center"}>{errorResponse}</Text>}
                    <Box>
                        <Input 
                            name='name' 
                            value={formData.name} 
                            onChange={handleChange}  
                            type='text' 
                            size={"lg"} 
                            placeholder='Name'
                            borderColor={errors.name ? "red.500" : "gray.300"}
                        />
                        {errors.name && <Text color="red.500" mt={1}>{errors.name}</Text>}
                    </Box>
                    <Box>
                        <Input 
                            name='email' 
                            value={formData.email} 
                            onChange={handleChange} 
                            type='email' 
                            size={"lg"} 
                            placeholder='Email'
                            borderColor={errors.email ? "red.500" : "gray.300"}
                        />
                        {errors.email && <Text color="red.500" mt={1}>{errors.email}</Text>}
                    </Box>
                    <Box>
                        <Input 
                            name='password' 
                            value={formData.password} 
                            onChange={handleChange} 
                            type='password' 
                            size={"lg"} 
                            placeholder='Password'
                            borderColor={errors.password ? "red.500" : "gray.300"}
                        />
                        {errors.password && <Text color="red.500" mt={1}>{errors.password}</Text>}
                    </Box>
                    <Button bgColor={theme.colors.teal} color={"white"} type='submit'>
                        Register
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default Register;
