import React, { Component } from 'react';
import logo from './logo.svg';
import './MyComponent.css';

class MyComponent extends Component {

  componentDidMount() {
    fetch('https://react-programming-challenge.herokuapp.com/')
  }

  render() {
    return (
      <div className="Component">
        <h1>What's this logo?</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is my stuff</h1>
      </div>
    );
  }
}

export default MyComponent;
