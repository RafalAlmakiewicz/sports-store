import React, { useState } from "react";
import Input from "./Input";
import axios, { AxiosError } from "axios";
import { useHistory } from "react-router";
import { apiEndpoint } from "../apiEndpoint";
import { useUser } from "../contexts/userContext";

interface UserFormProps {
  action: "register" | "login";
}

const UserForm = ({ action }: UserFormProps) => {
  const [error, setError] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { decodeToken } = useUser();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    let endpoint =
      action === "register" ? `${apiEndpoint}/users` : `${apiEndpoint}/auth`;
    axios
      .post(endpoint, { login, password })
      .then((response) => {
        const { data: token } = response;
        localStorage.setItem("token", token);
        decodeToken(token);
        history.push("/admin");
      })
      .catch((error: AxiosError) => {
        if (error.response && error.response.status === 400) {
          console.log("error: ", error.response);
          setError(error.response.data);
        }
      });
  };

  const handleChangeLogin: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setLogin(target.value);
  };

  const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setPassword(target.value);
  };

  return (
    <div>
      <h2>{action}</h2>
      <form onSubmit={handleSubmit} /*autoComplete="off"*/>
        <p className="error-msg">{error}</p>
        <Input
          name="login"
          type="text"
          value={login}
          onChange={handleChangeLogin}
          validation={{ required: true, minLength: 5, maxLength: 50 }}
        />
        <Input
          name="password"
          type="text"
          value={password}
          onChange={handleChangePassword}
          validation={{ required: true, minLength: 5, maxLength: 100 }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
