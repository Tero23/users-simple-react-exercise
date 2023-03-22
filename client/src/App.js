import { useState, useEffect } from "react";
import AddUser from "./components/user/AddUser";
import UsersList from "./components/user/UsersList";
import axios from "axios";

const serverURL = "http://localhost:8000/api/v1/users";

function App() {
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await axios.get(serverURL);
      setUserArray(users.data);
    };
    getUsers();
  }, []);

  const addUserHandler = async (username, age) => {
    setUserArray((prev) => {
      return [...prev, { username, age }];
    });
  };
  return (
    <div className="App">
      <AddUser onAddUser={addUserHandler} />
      <UsersList usersArray={userArray} />
    </div>
  );
}

export default App;
