import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as User from "../services/userService";

class RegisterForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { email: "", password: "", name: "" },
      errors: {}
    };
  }
  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  async doSubmit() {
    const token = await User.register(this.state.data);
    localStorage.setItem("token", token);
    this.props.history.replace("/");
  }

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Email", "email", true)}
          {this.renderInput("Password", "password", false, "password")}
          {this.renderInput("Name", "name")}
          {this.renderButton("Sign Up")}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
