import React, { Component } from 'react';
import {FETCH_PATH} from './config/fetch';
import Header from './components/Header';
import Main from './components/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';                                  
class App extends Component {
	constructor(props, context){
		super(props, context)
		this.state={
			login	:	{
							loggedIn			:	false,
							loggedInUsername	:	null,
							loggedInId			:	null,
							bookingChanges		: 	false,
							errResponse			: 	false,
							msgResponse			:	""
						},
			open	:	false,
		}

		this.handleLogin = this.handleLogin.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}

	componentWillMount(){
		//fetch here to check for login state
		let data = {"login_check" : true}
		fetch(FETCH_PATH+"/login", {
			method: "POST",
			body: JSON.stringify(data),
			headers: new Headers({"Content-Type": "application/json"})
		})
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({login: result})
				this.closeModal()
			},
			(error) => {
				console.log(error)
			}
		);
	}

	openModal(){
		this.setState({
			open	:	true,
		});
	}

	closeModal(){
		this.setState({
			open	:	false,
		});
	}

	handleLogin(event, email, password){
		let data = {"login_check" : false, "email":email, "password":password}
		//check that email or password are not undefined or empty
		fetch(FETCH_PATH+"/login", {
			method: "POST",
			body: JSON.stringify(data),
			headers: new Headers({"Content-Type": "application/json"})
		})
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({login: result})
				if (!result.errResponse){
					this.closeModal()
				}
			},
			(error) => {
				console.log(error)
			}
		);
	}
	handleLogout(event){
		fetch(FETCH_PATH+"/logout", {
			method: "POST",
			body: JSON.stringify({"logout": true}),
			headers: new Headers({"Content-Type": "application/json"})
		})
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({login: result})
			},
			(error) => {
				console.log(error)
			}
		);
	}
	render() {
		let login = this.state.login
		return (
			<MuiThemeProvider>
				<div>
					<Header 
						login={login} 
						handleLogout={this.handleLogout}
						handleLogin={this.handleLogin}
						closeModal={this.closeModal}
						openModal={this.openModal}
						open={this.state.open}
					/>
					<Main login={login}/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
