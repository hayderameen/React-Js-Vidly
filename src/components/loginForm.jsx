import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";
import { login } from "../services/userService";

class LoginForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { email: "", password: "" },
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
      .label("Password")
  };

  async doSubmit() {
    const token = await login(this.state.data); // JSON Web Token
    console.log("TOKEN --> ", token);
    localStorage.setItem("token", token);
    window.location = "/"; // To reload the app properly after logging in
  }

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Email", "email", true)}
          {this.renderInput("Password", "password", false, "password")}
          {this.renderButton("Login")}
          <Link to={`/register`}>
            <button style={{ marginLeft: 10 }} className="btn btn-link">
              Register
            </button>
          </Link>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
