import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {}
    };

    this.validate = this.validate.bind(this);
    this.validateProperty = this.validateProperty.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateProperty({ name, value }) {
    const tempObj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(tempObj, schema);

    return error ? error.details[0].message : null;
  }

  validate() {
    const options = {
      abortEarly: false
    };
    const result = Joi.validate(this.state.data, this.schema, options);

    const errors = {};

    if (!result.error) return null;

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  }

  handleSubmit(e) {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  }
  handleChange(e) {
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(e.currentTarget);

    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };

    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderInput(label, name, autoFocus = false, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        onChange={this.handleChange}
        autoFocus={autoFocus}
      />
    );
  }
}

export default Form;
