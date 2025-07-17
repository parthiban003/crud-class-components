import React, { Component } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

export default class UserPage extends Component {
  state = {
    selectedUser: null,
  };

  handleEdit = (user) => {
    this.setState({ selectedUser: user });
  };

  handleSuccess = () => {
    this.setState({ selectedUser: null });
  };

  render() {
    return (
      <div className="container">
        <UserForm
          editUser={this.state.selectedUser}
          onSuccess={this.handleSuccess}
        />
        <hr />
        <UserList onEdit={this.handleEdit} />
      </div>
    );
  }
}
