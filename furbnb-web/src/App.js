import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  error: null,
		  isLoaded: false,
		  items: []
		};
	  }
	componentDidMount(){
		fetch("http://furbnb-api.us-east-1.elasticbeanstalk.com")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				isLoaded: true,
				items: result.items
			  });
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
			  this.setState({
				isLoaded: true,
				error
			  });
			}
		 )	
	}
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          {this.state.items}
        </p>
      </div>
    );
  }
}

export default App;
