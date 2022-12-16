import React, { Component } from "react";

export default class Searchbar extends Component {
  state = {
    query: "",
  };

  onSubmit = (e) => {
    const { query } = this.state;
    e.preventDefault();
    this.props.onSubmit(query);
    this.setState({ query: "" });
    this.reset();
  };
  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value });
  };
  reset = () => {
    this.setState({ query: "" });
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label"></span>
          </button>

          <input
            className="SearchForm-input"
            value={this.state.query}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
