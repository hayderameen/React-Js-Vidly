import React, { Component } from "react";

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
