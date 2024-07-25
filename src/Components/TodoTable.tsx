import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { deleteTodo, getTodo } from "../Redux/app/action";
import { TodoItem } from "../Redux/app/types";
import {
  Box,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const TodoTable = () => {
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
  const todos = useSelector((store: any) => store.appReducer.todo.Todo);
  const userId = localStorage.getItem("id");
  const loading = useSelector((store: any) => store.appReducer.isLoading)
  const [refresh, setRefresh] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal controls
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null); // State to hold the selected todo

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch, refresh]);

  const deleteHandler = (id: string) => {
    dispatch(deleteTodo(id)).then((res) => {
      console.log(res);
      setRefresh(id);
    });
  };

  const viewHandler = (todo: TodoItem) => {
    setSelectedTodo(todo); // Set the selected todo
    onOpen(); // Open the modal
  };

  const filteredTodos = todos?.filter(
    (item: TodoItem) => item.user._id === userId
  );

  return (
    

    <Box p={4} width="80%" margin="auto" mt={5}>
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
          <PulseLoader color="teal" />
        </Box>
      )}
      <Box>
        {
          loading && <PulseLoader />
        }
      </Box>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>View</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTodos?.map((item: TodoItem) => (
              <Tr key={item._id}>
                <Td>{item?.user?.name}</Td>
                <Td>{item.title}</Td>
                <Td>{item.description}</Td>
                <Td>
                  <Button
                    bgColor={"teal"}
                    color={"white"}
                    onClick={() => viewHandler(item)}
                  >
                    View
                  </Button>
                </Td>
                <Link to={`/todo/${item._id}`}>
                  <Td>
                    <Button>Edit</Button>
                  </Td>
                </Link>
                <Td>
                  <Button
                    onClick={() => deleteHandler(item._id)}
                    bgColor={"red"}
                    color={"white"}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="xl">Todo Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={4}>
              <Flex align="center" mb={2}>
                <Text fontWeight="bold" color="teal.500" minWidth="70px" fontSize="lg">
                  Title:
                </Text>
                <Text fontSize="lg">{selectedTodo?.title}</Text>
              </Flex>
              <Flex align="center" mb={2}>
                <Text fontWeight="bold" color="teal.500" minWidth="70px" fontSize="lg">
                  Desc:
                </Text>
                <Text fontSize="lg">{selectedTodo?.description}</Text>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TodoTable;
