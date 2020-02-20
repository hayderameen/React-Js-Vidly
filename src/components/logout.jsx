import React, { Component } from "react";
import { logoutAuth } from "../services/authService";

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    logoutAuth();
  }

  render() {
    return null;
  }
}

export default Logout;
