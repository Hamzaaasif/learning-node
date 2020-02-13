import React from 'react'

import {Route , Switch} from 'react-router-dom' 
import {Home} from './core/Home'
import {SignInSide} from './users/signin'
import SignUp  from './users/signup' 

export const MainRouter =()=>(
  <div>
    <Switch>
          <Route exact path="/" component={Home}></Route>
         <Route exact path="/Signin" component={SignInSide}></Route>
         <Route exact path = "/signup" component = {SignUp}></Route>
    </Switch>
  </div>
)
