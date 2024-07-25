import { Box, Input, Stack, Text, Button } from '@chakra-ui/react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import theme from "../theme";
import { FormDataLogin } from '../Redux/auth/types';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { postLogin } from '../Redux/auth/action';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
    const navigate = useNavigate();

    const init: FormDataLogin = {
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState<FormDataLogin>(init);
    const [errorResponse, setErrorResponse] = useState<string>("");
    const [errors, setErrors] = useState<Partial<FormDataLogin>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: Partial<FormDataLogin> = {};

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

        dispatch(postLogin(formData))
            .then(res => {
                if (res?.payload?.response?.data?.message) {
                    setErrorResponse(res?.payload?.response?.data?.message);
                }
                if (res?.payload?.message === "login success") {
                    localStorage.setItem("id", res?.payload?.id);
                    localStorage.setItem("token", res?.payload?.token);
                    navigate("/");
                }
            });
    };

    return (
        <Box width={"40%"} margin={"auto"} mt={"200px"}>
            <form onSubmit={handleSubmit}>
                <Stack spacing='10px'>
                    {errorResponse && <Text textAlign={"center"} color={"red"}>{errorResponse}</Text>}
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
                        Login
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default Login;
