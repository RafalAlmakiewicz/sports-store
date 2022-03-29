import React, { useEffect, useState } from "react";
import Input from "../reusable/input/input";
import { useHistory } from "react-router";
import { useUser } from "../../contexts/userContext";
import { useValidation } from "../../hooks/useValidation";
import ErrorList from "../reusable/errorsList/errorsList";
import tryRequest from "../../utils/tryRequest";
import styles from "./userForm.module.scss";

interface UserFormProps {
  action: "register" | "login";
}

const UserForm = ({ action }: UserFormProps) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { decodeToken, logIn, register } = useUser();

  const { errors, setErrors, reset, validateAllTouched, shouldDisableSubmit } =
    useValidation([
      {
        name: "login",
        required: true,
        minLength: 5,
        maxLength: 50,
      },

      {
        name: "password",
        required: true,
        minLength: 5,
        maxLength: 100,
      },
    ]);

  useEffect(() => {
    reset();
    setLogin("");
    setPassword("");
  }, [action]);

  const validate = (touchedFieldName: string) => () => {
    validateAllTouched(touchedFieldName, [
      { name: "login", value: login },
      { name: "password", value: password },
    ]);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const request = async () => {
      const request = action === "login" ? logIn : register;
      const { data: token } = await request(login, password);
      localStorage.setItem("token", token);
      decodeToken(token);
      history.push("/admin");
    };
    const error = await tryRequest(request);
    if (error) setErrors([error]);
  };

  return (
    <div className={styles.form}>
      <h2>{action}</h2>
      <p>
        Hello! Part of my app's functionalites are availible only after logging
        in. Login as default user - <mark>login: user1, pasword: 12345</mark>,
        or register a new user, to access admin panel which allows to create,
        update and delete products.
      </p>
      <form onSubmit={handleSubmit}>
        <ErrorList errors={errors} />
        <Input
          name="login"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          onBlur={validate("login")}
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validate("password")}
        />
        <button
          className="btn-primary"
          disabled={shouldDisableSubmit()}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
