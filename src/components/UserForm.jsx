import React, { Component } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      email: "",
      id: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.editUser && this.props.editUser.id !== prevProps.editUser?.id) {
      this.setState({
        name: this.props.editUser.name,
        age: this.props.editUser.age,
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
        age: this.state.age,
        email: this.state.email,
      });
    } else {
      await addDoc(usersCollection, {
        name: this.state.name,
        age: this.state.age,
        email: this.state.email,
      });
    }

    this.setState({ name: "", age: "", email: "", id: null });
    this.props.onSuccess(); 
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="container mt-4 bg-light rounded" style={{ maxWidth: "500px", margin: "20px auto" }}
>       
         <h2>CRUD in Class Components</h2>
        <h3 className="text-primary">{this.state.id ? "Update" : "Add"} User</h3>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <input
          type="text"
            className="form-control mb-2"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <input type="number" 
          name="age"
          className="form-control mb-2"
          placeholder="Age"
          value={this.state.age}
          onChange={this.handleChange}
          required
          />
          <input
          type="email"
            className="form-control mb-2"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <button className="btn btn-primary fw-bold" type="submit">
            {this.state.id ? "Update" : "Add"}
          </button><br /><br />
        </form>
      </div>
    );
  }
}
