import React, { Component } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.editUser && this.props.editUser.id !== prevProps.editUser?.id) {
      this.setState({
        name: this.props.editUser.name,
        email: this.props.editUser.email,
        id: this.props.editUser.id,
      });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const usersCollection = collection(db, "users");

    if (this.state.id) {
      const userDoc = doc(db, "users", this.state.id);
      await updateDoc(userDoc, {
        name: this.state.name,
        email: this.state.email,
      });
    } else {
      await addDoc(usersCollection, {
        name: this.state.name,
        email: this.state.email,
      });
    }

    this.setState({ name: "", email: "", id: null });
    this.props.onSuccess(); 
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="container mt-4">
        <h3>{this.state.id ? "Update" : "Add"} User</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-control mb-2"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <input
            className="form-control mb-2"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <button className="btn btn-primary" type="submit">
            {this.state.id ? "Update" : "Add"}
          </button>
        </form>
      </div>
    );
  }
}
