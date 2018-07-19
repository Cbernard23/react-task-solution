import React from 'react';
import Modal from 'react-modal';
import Cookie from 'js-cookie'

const axios = require('axios');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#login')

class CreateProject extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      projectName: "",
      projectDescription: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#000';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleInputChange(event) {
   const target = event.target;
   const value = target.type === 'checkbox' ? target.checked : target.value;
   const name = target.name;

   this.setState({
     [name]: value
   });
 }

 handleSubmit(event) {
   axios.post('https://react-programming-challenge.herokuapp.com/api/login', {
     email: this.state.loginEmail,
     password: this.state.loginPassword,
    })
    .then(function (response) {
      Cookie.set('authorization', response.data.token);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.closeModal();
    alert('Welcome back, ' + this.state.loginEmail + '!');
    event.preventDefault();
    this.setCurrentUser();
  }

  setCurrentUser() {
    axios.get('https://react-programming-challenge.herokuapp.com/api/users', {
      headers: {
        Authorization: Cookie.get('authorization')
      }
    })
    .then(function (response) {
      Cookie.set('user', response.data.email);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Login</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Login"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Login</h2>
          <form onSubmit={this.handleSubmit}>
             <label>
               Project Name:
               <input
                 name="projectName"
                 type="text"
                 value={this.state.loginEmail}
                 onChange={this.handleInputChange} />
             </label>
             <label>
               Project Description:
               <textarea
                 name="projectDesctiption"
                 type="password"
                 value={this.state.projectDescription}
                 onChange={this.handleInputChange} />
             </label>
             <input type="submit" value="Submit" />
           </form>
        </Modal>
      </div>
    );
  }
}

export default Login;
