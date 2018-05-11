import React, { Component } from 'react';
import AccountCard from './AccountCard';
import Search from './Search';
import {FETCH_PATH} from '../config/fetch.js';

class Home extends Component {
	constructor(props, context){
		super(props, context)
		this.state = {
			accountlist	:	[],
			petType			:	null,
			selectedCity	:	null,
			propertyType	:	null
		}
	}
	handleSearch = (event, key, payload, update) => {
		this.setState(update)
		let searchTermsUpdate = Object.assign({}, this.state, update)
		let searchTerms = {}
		for (var x in searchTermsUpdate){
			if (x !== "accountlist"){
				if (x === "selectedCity"){
					searchTerms["city_id"] = searchTermsUpdate[x]
				} else {
					searchTerms[x] = searchTermsUpdate[x]
				}
			}
		}

		fetch(FETCH_PATH+"/search", {
			method: 'POST',
			body: JSON.stringify(searchTerms),
			headers: new Headers({'Content-Type': 'application/json'})
		})
		  .then(res => res.json())
		  .then(
			(result) => {
				this.setState({
					accountlist	:	result.accounts
				})
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log(error)
			}
		 )	
	}
	componentDidMount(){
		fetch(FETCH_PATH)
		  .then(res => res.json())
		  .then(
			(result) => {
				this.setState({
					accountlist	:	result.accounts
				})
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log(error)
			}
		 )	
	}
  render() {
	let accountJSX = this.state.accountlist.map((account, index) =>
		<AccountCard 	key={account.id} 
						city={account.city} 
						property_type={account.property_type} 
						name={account.name} 
						description={account.description}/>
	);
    return (
		<div>
		<Search
			handleSearch={this.handleSearch}
			petType={this.state.petType}
			propertyType={this.state.propertyType}
			selectedCity={this.state.selectedCity} />
		<div className="flexWrap">{accountJSX}</div>
		</div>
    );
  }
}

export default Home;
