// import React, { Component } from 'react';
// import { CircularProgress, Typography } from '@material-ui/core';
// import Dashboard from './Dashboard';
// import SignIn from './SignIn';
// import 'whatwg-fetch';
// import './Admin.css'
// import {
//   apiURL
// } from '../../utils/shared';

// import {
//   getFromStorage,
//   setInStorage,
// } from '../../utils/storage';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Dashboard from './Dashboard';
import Menu from '../Menu/Menu';
// import SignIn from './SignIn';
import 'whatwg-fetch';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
// import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';



import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export const TokenContext = React.createContext()
export const UsernameContext = React.createContext()
export const LogoutContext = React.createContext()
export const AdminContext = React.createContext()

export default function Admin() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(true)
  const [token, setToken] = React.useState('')
  const [signedInUser, setSignedInUser] = React.useState('')
  // const [signUpError, setSignUpError] = React.useState('')
  const [signInError, setSignInError] = React.useState('')
  const [signInEmail, setSignInEmail] = React.useState('')
  const [signInPassword, setSignInPassword] = React.useState('')
  // const [signUpEmail, setSignUpEmail] = React.useState('')
  // const [signUpPassword, setSignUpPassword] = React.useState('')

  React.useEffect(() => {
    const obj = getFromStorage('the_main_app');
    console.log(window.location.pathname)
    if (obj && obj.token) {
      // Verify token
      fetch('/api/account/verify?token=' + obj.token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setToken(obj.token)
            setIsLoading(false)
            // fetch('/api/account/getusername?token=' + obj.token)
            //   .then(res => res.json())
            //   .then(json => {
            //     if (json.success) {
            //       setSignedInUser(json.username)
            //     }
            //   });
          } else {
            setIsLoading(false)
          }
        });
    } else {
      setIsLoading(false)
    }
  }, []);

  const onTextboxChangeSignInEmail = (event) => {
    setSignInEmail(event.target.value)
  }

  const onTextboxChangeSignInPassword = (event) => {
    setSignInPassword(event.target.value)
  }

  // const onTextboxChangeSignUpEmail = (event) => {
  //   setSignUpEmail(event.target.value)
  // }

  // const onTextboxChangeSignUpPassword = (event) => {
  //   setSignUpPassword(event.target.value)
  // }

  // const onSignUp = () => {
  //   setIsLoading(true)

  //   // Post request to backend
  //   fetch('/api/account/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       email: signUpEmail,
  //       password: signUpPassword,
  //     }),
  //   }).then(res => res.json())
  //     .then(json => {
  //       if (json.success) {

  //           setSignUpError(json.message)
  //           setIsLoading(false)
  //           setSignUpEmail('')
  //           setSignUpPassword('')
  //       } else {
  //         setSignUpError(json.message)
  //         setIsLoading(false)
  //       }
  //     });
  // }

  const onSignIn = () => {

    setIsLoading(false)
    // console.log(signInEmail)
    // console.log(signInPassword)
    // Post request to backend
    fetch('/api/account/signin', {
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
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          setSignInError(json.message)
          // fetch('/api/account/getusername?token=' + json.token)
          //     .then(res => res.json())
          //     .then(json => {
          //       if (json.success) {
          //         setSignedInUser(json.username)
          //       }
          //     });
          setIsLoading(false)
          setSignInEmail('')
          setSignInPassword('')
          setToken(json.token)
        } else {
          setSignInError(json.message)
          setIsLoading(false)
        }
      });
  }

  const logout = () => {
    setIsLoading(true)
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      // Verify token
      fetch('/api/account/logout?token=' + obj.token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setToken('')
            setIsLoading(false)
          } else {
            setIsLoading(false)
          }
        });
    } else {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (<div style={{ textAlign: 'center', margin: "2px" }}><CircularProgress /><Typography style={{ color: 'white', margin: "2px" }} variant="h6" >
    Loading...
</Typography></div>);
  } else if (!token) {
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography  component="h1" variant="h5">
            Sign in
    </Typography>
          {
            signInError ? (
              <Alert severity="error">Wrong username or password</Alert>
            ) : (null)
          }

          {/* <form className={classes.form} noValidate> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              value={signInEmail}
              onChange={onTextboxChangeSignInEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={signInPassword}
              onChange={onTextboxChangeSignInPassword}
              autoComplete="current-password"
            />
            {/* <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSignIn}
            >
              Sign In
      </Button>
            {/* {
        (props.data.state.isLoading) ? (
          <CircularProgress /> 
          ) : (null)
      } */}
            {/* <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid> */}
          {/* </form> */}
        </div>
        <Box mt={8}>
          {/* <Copyright /> */}
        </Box>
      </Container>)

  } else {
    return (
      // <Dashboard logout={logout} signedin={signedInUser} />
      // <UsernameContext.Provider value={signedInUser}>
      <AdminContext.Provider value={true}>
      
      <Menu logout={logout} signedin={signedInUser} admin={true} />
      </AdminContext.Provider>
      
    )
  }


}




// class Admin extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isLoading: true,
//       token: '',
//       signedInUser: '',
//       signUpError: '',
//       signInError: '',
//       signInEmail: '',
//       signInPassword: '',
//       signUpEmail: '',
//       signUpPassword: '',
//     };

//     this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
//     this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
//     this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
//     this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

//     this.onSignIn = this.onSignIn.bind(this);
//     this.onSignUp = this.onSignUp.bind(this);
//     this.logout = this.logout.bind(this);
//   }

//   componentDidMount() {
//     const obj = getFromStorage('the_main_app');
//     if (obj && obj.token) {
//       const { token } = obj;
//       // Verify token
//       fetch('/api/account/verify?token=' + token)
//         .then(res => res.json())
//         .then(json => {
//           if (json.success) {
//             this.setState({
//               token,
//               isLoading: false,
//             });
//             fetch('/api/account/getusername?token=' + token)
//               .then(res => res.json())
//               .then(json => {
//                 if (json.success) {
//                   console.log(json.username)
//                   this.setState({

//                     signedInUser: json.username
//                   });

//                 }
//               });
//           } else {
//             this.setState({
//               isLoading: false,
//             });
//           }
//         });
//     } else {
//       this.setState({
//         isLoading: false,
//       });
//     }
//     console.log(this.state.signedInUser)
//   }

//   onTextboxChangeSignInEmail(event) {
//     this.setState({
//       signInEmail: event.target.value,
//     });
//   }

//   onTextboxChangeSignInPassword(event) {
//     this.setState({
//       signInPassword: event.target.value,
//     });
//   }

//   onTextboxChangeSignUpEmail(event) {
//     this.setState({
//       signUpEmail: event.target.value,
//     });
//   }

//   onTextboxChangeSignUpPassword(event) {
//     this.setState({
//       signUpPassword: event.target.value,
//     });
//   }

//   onSignUp() {
//     // Grab state
//     const {
//       signUpEmail,
//       signUpPassword,
//     } = this.state;

//     this.setState({
//       isLoading: true,
//     });

//     // Post request to backend
//     fetch(apiURL + '/api/account/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email: signUpEmail,
//         password: signUpPassword,
//       }),
//     }).then(res => res.json())
//       .then(json => {
//         console.log('json', json);
//         if (json.success) {
//           this.setState({
//             signUpError: json.message,
//             isLoading: false,
//             signUpEmail: '',
//             signUpPassword: '',
//           });
//         } else {
//           this.setState({
//             signUpError: json.message,
//             isLoading: false,
//           });
//         }
//       });
//   }

//   onSignIn() {
//     // Grab state
//     const {
//       signInEmail,
//       signInPassword,
//     } = this.state;
//     this.setState({
//       isLoading: true,
//     });
//     // console.log(signInEmail)
//     // console.log(signInPassword)
//     // Post request to backend
//     fetch(apiURL + '/api/account/signin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email: signInEmail,
//         password: signInPassword,
//       }),
//     }).then(res => res.json())
//       .then(json => {
//         console.log('json', json);
//         if (json.success) {
//           setInStorage('the_main_app', { token: json.token });
//           console.log(json.token)
//           this.setState({
//             signInError: json.message,
//             isLoading: false,
//             signInPassword: '',
//             signInEmail: '',
//             token: json.token,
//           });
//         } else {
//           this.setState({
//             signInError: json.message,
//             isLoading: false,
//           });
//         }
//       });
//   }

//   logout() {
//     this.setState({
//       isLoading: true,
//     });
//     const obj = getFromStorage('the_main_app');
//     if (obj && obj.token) {
//       const { token } = obj;
//       // Verify token
//       fetch(apiURL + '/api/account/logout?token=' + token)
//         .then(res => res.json())
//         .then(json => {
//           if (json.success) {
//             this.setState({
//               token: '',
//               isLoading: false
//             });
//           } else {
//             this.setState({
//               isLoading: false,
//             });
//           }
//         });
//     } else {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   }

//   render() {
//     const {
//       isLoading,
//       token,
//       // signInError,
//       // signInEmail,
//       // signInPassword,
//       // signUpEmail,
//       // signUpPassword,
//       // signUpError,
//     } = this.state;
//     document.body.style.background = "white"

//     if (isLoading) {
//       return (<div style={{ textAlign: 'center', margin: '10px'  }}><CircularProgress /><Typography variant="h6">
//       Loading...
//     </Typography>
//         </div>);
//     }
// // console.log(token)
//     if (!token) {
//       return (
//         <SignIn data={this} />
//         // <div>
//         //   <div>
//         //     {
//         //       (signInError) ? (
//         //         <p>{signInError}</p>
//         //       ) : (null)
//         //     }
//         //     <p>Sign In</p>
//         //     <input
//         //       type="email"
//         //       placeholder="Email"
//         //       value={signInEmail}
//         //       onChange={this.onTextboxChangeSignInEmail}
//         //     />
//         //     <br />
//         //     <input
//         //       type="password"
//         //       placeholder="Password"
//         //       value={signInPassword}
//         //       onChange={this.onTextboxChangeSignInPassword}
//         //     />
//         //     <br />
//         //     <button onClick={this.onSignIn}>Sign In</button>
//         //   </div>
//         //   <br />
//         //   <br />
//         //   <div>
//         //     {
//         //       (signUpError) ? (
//         //         <p>{signUpError}</p>
//         //       ) : (null)
//         //     }
//         //     <p>Sign Up</p>
//         //     <input
//         //       type="email"
//         //       placeholder="Email"
//         //       value={signUpEmail}
//         //       onChange={this.onTextboxChangeSignUpEmail}
//         //     /><br />
//         //     <input
//         //       type="password"
//         //       placeholder="Password"
//         //       value={signUpPassword}
//         //       onChange={this.onTextboxChangeSignUpPassword}
//         //     /><br />
//         //     <button onClick={this.onSignUp}>Sign Up</button>
//         //   </div>

//         // </div>
//       );
//     }

//     return (


//         <Dashboard data={this} />



//     );
//   }
// }

// export default Admin;