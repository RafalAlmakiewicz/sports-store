import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";

const UserForm = ({ endpoint, action }) => {
  const [error, setError] = useState("");

  const propsFor = {
    login: {
      name: "login",
      type: "text",
      validation: { required: true, minLength: 5, maxLength: 50 },
    },
    password: {
      name: "password",
      type: "text",
      validation: { required: true, minLength: 5, maxLength: 100 },
    },
  };

  const prepareFormData = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    trySubmit(Object.fromEntries(formData));
  };

  const trySubmit = async (user) => {
    try {
      const { data: token } = await axios.post(endpoint, user);
      localStorage.setItem("token", token);
      window.location = "/";
      //history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("error: ", ex.response);
        setError(ex.response.data);
      }
    }
  };

  return (
    <div>
      <h1>{action}</h1>
      <p>{error}</p>
      <form onSubmit={prepareFormData}>
        <Input {...propsFor.login} />
        <Input {...propsFor.password} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
