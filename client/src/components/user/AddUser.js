import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css";
import ErrorModel from "../UI/ErrorModel";
import axios from "axios";

const serverURL = "http://localhost:8000/api/v1/users";

const AddUser = ({ onAddUser }) => {
  const addedUsername = useRef();
  const addedAge = useRef();

  // const [username, setUsername] = useState("");
  // const [age, setAge] = useState();
  const [error, setError] = useState();

  // const usernameHandler = (e) => {
  //   setUsername(e.target.value);
  // };

  // const ageHandler = (e) => {
  //   setAge(e.target.value);
  // };

  const addUserHandler = async (event) => {
    const username = addedUsername.current.value;
    const age = addedAge.current.value;
    event.preventDefault();
    if (username.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid Input!",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid Age!",
        message: "Please enter a valid age.",
      });
      return;
    }

    await axios.post(
      serverURL,
      {
        username,
        age,
      },
      {
        "content-type": "application/json",
      }
    );

    onAddUser(username, age);
    addedUsername.current.value = "";
    addedAge.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModel
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            ref={addedUsername}
          />
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" placeholder="Age" ref={addedAge} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
