import React from 'react';
import Modal from 'react-modal';

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
Modal.setAppElement('#signup')

class Signup extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      userEmail: "",
      userPassword: "",
      userPasswordConfirmation: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
   axios.post('https://react-programming-challenge.herokuapp.com/api/users', {
     email: this.state.userEmail,
     password: this.state.userPassword,
     password_confirmation: this.state.userPasswordConfirmation
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.closeModal();
    alert('Thanks for signing up, ' + this.state.userEmail + '!');
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Signup</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Signup"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Signup</h2>
          <form onSubmit={this.handleSubmit}>
             <label>
               Email:
               <input
                 name="userEmail"
                 type="email"
                 value={this.state.userEmail}
                 onChange={this.handleInputChange} />
             </label>
             <label>
               Password:
               <input
                 name="userPassword"
                 type="password"
                 value={this.state.userPassword}
                 onChange={this.handleInputChange} />
             </label>
             <label>
               Confirm Password:
               <input
                 name="userPasswordConfirmation"
                 type="password"
                 value={this.state.userPasswordConfirmation}
                 onChange={this.handleInputChange} />
             </label>
             <input type="submit" value="Submit" />
           </form>
        </Modal>
      </div>
    );
  }
}

export default Signup;
