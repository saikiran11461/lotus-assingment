import { Box, Button } from "@chakra-ui/react";
import theme from "../theme";
import React from "react";

import TodoTable from "../Components/TodoTable";
import { Link } from "react-router-dom";

const Todo = () => {
  return (
    <>
      <Box width={"90%"} margin={"auto"}>
        <Link to={"/addTodo"}>
          <Button
            ml={"150px"}
            mt={"80px"}
            bgColor={theme.colors.teal}
            mr={"10px"}
            color={"white"}
          >
            AddTodo
          </Button>
        </Link>
        <TodoTable />
      </Box>
    </>
  );
};

export default Todo;
