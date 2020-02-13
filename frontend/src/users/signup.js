import React ,{Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


//  import {useStyles} from './styles'
import Copyright from './styles'




  class SignUp extends Component {   
    
    constructor()
    {
      super()
      this.state = {
        user_name : "",
        email :"",
        hashedPassword : "",
        err: ""
      }
      
    }

    ClickSubmit = event =>
    {
      event.preventDefault();
      const {user_name , email , hashedPassword} = this.state
      const user ={
        user_name , 
        email ,
        hashedPassword 
      }
      console.log("Password pass at front end : " , user.password);
      fetch("http://localhost:8000/signup" , {
        method : "POST",
        headers :{
          Accept : "application/json",
          "Content-Type" :"application/json"
        },
        body : JSON.stringify(user)
    })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))

    };

    handleChange = (name ) => event =>
    {
      this.setState({[name] : event.target.value })
    }

    

  render()
  {
    

    const {user_name , email , hashedPassword} = this.state
    return ( 
      
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className= "container"> 
        <br/><h1 align = 'center' className ="">Sign up</h1><br/>
          
        <form className ="form" noValidate>
          <Grid container spacing={2}>


            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="username"
                value = {user_name}
                onChange = {this.handleChange("user_name")}
                autoComplete="Uname"
              />

            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value = {email}
                onChange = {this.handleChange("email")}
                autoComplete="email"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value = {hashedPassword}
                onChange = {this.handleChange("hashedPassword")}
                autoComplete="current-password"
              />
              
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Accept Terms and conditions."
              />
            </Grid>
          </Grid>

          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.ClickSubmit}
            className="submit"
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="http://localhost:3000/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    
    );
 }
}

export default SignUp;