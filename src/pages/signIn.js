import { Button, Input } from "antd";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useSelector } from "react-redux";
import { selectUserInfo, userLogin } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector(selectUserInfo);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/todos");
    }
  }, [isLoggedIn]);

  const { errors, handleChange, handleSubmit } = useForm({
    initialValue: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      const data = await dispatch(
        userLogin({
          email: values.email,
          password: values.password,
        })
      );
      const { access_token } = data;
      if (access_token !== undefined) navigate("/todos");
    },

    validate: ({ email, password }) => {
      const errors = {};
      const Email_Regex = /^.+@.+\..+$/.test(email);

      if (!email) errors["email"] = "이메일을 입력해주세요";
      else if (!Email_Regex) errors["email"] = "올바른 이메일 형식이 아닙니다 ";

      if (!password) errors["password"] = "비밀번호를 입력해주세요";
      else if (password.length < 7)
        errors["password"] = "비밀번호는 8자리 이상이어야 합니다";
      return errors;
    },
  });

  return (
    <Wrapper>
      <h1>로그인</h1>
      <FormContainer onSubmit={handleSubmit}>
        <InputError>
          <Input
            size="large"
            placeholder="이메일을 입력해주세요"
            name="email"
            onChange={handleChange}
            autoComplete="off"
          />
          <p>{errors["email"]}</p>
        </InputError>
        <InputError>
          <Input
            size="large"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <p>{errors["password"]}</p>
        </InputError>

        <Button
          type="primary"
          shape="round"
          size="large"
          htmlType="submit"
          disabled={Object.keys(errors).length > 0 ? true : false}
        >
          Sign In!
        </Button>
        <GoSignUp>
          오늘 처음이신가요? <Link to={"/signUp"}>회원가입 하기</Link>
        </GoSignUp>
      </FormContainer>
    </Wrapper>
  );
};;;;

export default SignIn;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 200px;
  text-align: center;
`;

const FormContainer = styled.form`
  height: 300px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const InputError = styled.div`
  height: 70px;
  p {
    text-align: left;
    color: red;
    margin-top: 0.5rem;
    margin-left: 0.7rem;
  }
`;

const GoSignUp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;