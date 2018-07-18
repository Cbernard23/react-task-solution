import React from 'react';
import Modal from 'react-modal';

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

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Login"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Login</h2>
          <form action="/my-handling-form-page" method="post">
            <div>
              <label for="name">Name:</label>
              <input type="text" id="name" name="user_name" />
            </div>
            <div>
              <label for="mail">E-mail:</label>
              <input type="email" id="mail" name="user_mail" />
            </div>
            <div>
              <label for="msg">Message:</label>
              <textarea id="msg" name="user_message"></textarea>
            </div>
          </form>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />

          </form>
        </Modal>
      </div>
    );
  }
}

export default Login;
