import { Box, Input, Stack, Text, Button } from '@chakra-ui/react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { postTodo } from '../Redux/app/action';
import theme from '../theme';
import { TodoPayload } from '../Redux/app/types';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {
    const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
    const navigate = useNavigate();

    const init: TodoPayload = {
        user: localStorage.getItem("id") || null,
        title: "",
        description: ""
    };

    const [formData, setFormData] = useState<TodoPayload>(init);
    const [errors, setErrors] = useState<Partial<TodoPayload>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: Partial<TodoPayload> = {};

        if (!formData.title) {
            newErrors.title = "Title is required";
        }
        if (!formData.description) {
            newErrors.description = "Description is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return; // Prevent form submission if there are validation errors
        }

        dispatch(postTodo(formData))
            .then(res => {
                console.log(res.payload.message);
                if (res.payload.message === "postTodo Success") {
                    navigate("/");
                }
            });
    };

    return (
        <Box width={"40%"} margin={"auto"} mt={"200px"}>
            <form onSubmit={handleSubmit}>
                <Stack spacing='10px'>
                    <Box>
                        <Input
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                            type='text'
                            size={"lg"}
                            placeholder='Title'
                            borderColor={errors.title ? "red.500" : "gray.300"}
                        />
                        {errors.title && <Text color="red.500" mt={1}>{errors.title}</Text>}
                    </Box>
                    <Box>
                        <Input
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            type='text'
                            size={"lg"}
                            placeholder='Description'
                            borderColor={errors.description ? "red.500" : "gray.300"}
                        />
                        {errors.description && <Text color="red.500" mt={1}>{errors.description}</Text>}
                    </Box>
                    <Button bgColor={theme.colors.teal} color={"white"} type='submit'>
                        Submit
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default AddTodo;
