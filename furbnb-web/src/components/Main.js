import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import CreateAccount from './CreateAccount'
import Home from './Home'
import Login from './Login'

const Main = () => (
	  <main>
	    <Switch>
	      <Route exact path='/' component={Home}/>
	      <Route path='/create' component={CreateAccount}/>
	      <Route path='/login' component={Login}/>
	    </Switch>
	  </main>
)

export default Main
