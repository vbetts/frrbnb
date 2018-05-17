import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CreateAccount from './CreateAccount'
import Home from './Home'
import Login from './Login'
import Profile from './Profile'
import NoMatch from './NoMatch'

const Main = () => (
	  <main>
	    <Switch>
	      <Route exact path='/' component={Home}/>
	      <Route path='/create' component={CreateAccount}/>
	      <Route path='/login' component={Login}/>
	      <Route path='/profile/:account_id' component={Profile}/>
			<Route component={NoMatch}/>
	    </Switch>
	  </main>
)

export default Main
