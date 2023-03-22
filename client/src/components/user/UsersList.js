import React from "react";
import Card from "../UI/Card";
import styles from "./UsersList.module.css";

const UsersList = (props) => {
  return (
    <Card className={styles.users}>
      <ul>
        {props.usersArray.map((user, i) => (
          <li key={i}>
            {user.username} {user.age} years old
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
