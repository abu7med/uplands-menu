import React, { Component } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import Dashboard from './Dashboard';
import SignIn from './SignIn';
import 'whatwg-fetch';

import {
  apiURL
} from '../../utils/shared';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signedInUser: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch(apiURL + '/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false,
            });
            fetch(apiURL + '/api/account/getusername?token=' + token)
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  console.log(json.username)
                  this.setState({
                    
                    signedInUser: json.username
                  });

                }
              });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
    console.log(this.state.signedInUser)
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch(apiURL + '/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;
    this.setState({
      isLoading: true,
    });
    // console.log(signInEmail)
    // console.log(signInPassword)
    // Post request to backend
    fetch(apiURL + '/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          console.log(json.token)
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch(apiURL + '/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      // signInError,
      // signInEmail,
      // signInPassword,
      // signUpEmail,
      // signUpPassword,
      // signUpError,
    } = this.state;

    if (isLoading) {
      return (<div><CircularProgress /><Typography variant="h6">
      Loading...
    </Typography>
        </div>);
    }
// console.log(token)
    if (!token) {
      return (
        <SignIn data={this} />
        // <div>
        //   <div>
        //     {
        //       (signInError) ? (
        //         <p>{signInError}</p>
        //       ) : (null)
        //     }
        //     <p>Sign In</p>
        //     <input
        //       type="email"
        //       placeholder="Email"
        //       value={signInEmail}
        //       onChange={this.onTextboxChangeSignInEmail}
        //     />
        //     <br />
        //     <input
        //       type="password"
        //       placeholder="Password"
        //       value={signInPassword}
        //       onChange={this.onTextboxChangeSignInPassword}
        //     />
        //     <br />
        //     <button onClick={this.onSignIn}>Sign In</button>
        //   </div>
        //   <br />
        //   <br />
        //   <div>
        //     {
        //       (signUpError) ? (
        //         <p>{signUpError}</p>
        //       ) : (null)
        //     }
        //     <p>Sign Up</p>
        //     <input
        //       type="email"
        //       placeholder="Email"
        //       value={signUpEmail}
        //       onChange={this.onTextboxChangeSignUpEmail}
        //     /><br />
        //     <input
        //       type="password"
        //       placeholder="Password"
        //       value={signUpPassword}
        //       onChange={this.onTextboxChangeSignUpPassword}
        //     /><br />
        //     <button onClick={this.onSignUp}>Sign Up</button>
        //   </div>

        // </div>
      );
    }

    return (


        <Dashboard data={this} />



    );
  }
}

export default Admin;