import React, { Component } from 'react';
import AccountCard from './AccountCard';

class Home extends Component {
	constructor(props, context){
		super(props, context)
		this.state = {
			accountlist	:	[],
		}
	}
	componentDidMount(){
		//fetch("http://furbnb-api.us-east-1.elasticbeanstalk.com")
		fetch("http://127.0.0.1:5000")
		  .then(res => res.json())
		  .then(
			(result) => {
				this.setState({
					accountlist	:	result
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
		<div className="flexWrap">{accountJSX}</div>
    );
  }
}

export default Home;
