import { Button, Input } from "antd";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
  addNewPost,
} from "../features/todos/todoSlice";

const TodoList = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("TOKEN");
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (token === null) {
      navigate("/signIn");
    }
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const [newTodo, setNewTodo] = useState("");
  const handleAddClick = () => {
    console.log(newTodo);
    dispatch(addNewPost({ todo: newTodo }));
    setNewTodo("");
  };
  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  return (
    <Wrapper>
      <h1>나의 할일 목록</h1>
      <Input
        placeholder="할일을 입력하세요"
        style={{
          width: "calc(100% - 200px)",
        }}
        size="large"
        value={newTodo}
        onChange={handleChange}
      />
      <Button type="primary" size="large" onClick={handleAddClick}>
        추가하기
      </Button>
      <ListWrapper>
        {posts.map((todo, idx) => (
          <TodoItem data={todo} key={idx} />
        ))}
      </ListWrapper>
    </Wrapper>
  );
};
export default TodoList;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 100px;
  text-align: center;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
`;