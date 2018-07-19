import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import MyComponent from './MyComponent';
import Login from './Login';
import Signup from './Signup';
import CreateProject from './CreateProject';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<MyComponent />, document.getElementById('myComponent'));
ReactDOM.render(<Login />, document.getElementById('login'));
ReactDOM.render(<Signup />, document.getElementById('signup'));
ReactDOM.render(<CreateProject />, document.getElementById('createProject'))
registerServiceWorker();
