import React, { Component } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default class UserList extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    const usersRef = collection(db, "users");


    this.unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      this.setState({ users });
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  render() {
    return (
      <div className="container mt-4">
        <h3>User List</h3>
        <table className="table table-striped table-bordered table-responsive">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No users found
                </td>
              </tr>
            ) : (
              this.state.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => this.props.onEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => this.deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
