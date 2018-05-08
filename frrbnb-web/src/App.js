import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';                                  
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
		<div>
			<Header />
			<Main />
		</div>
      </MuiThemeProvider>
    );
  }
}

export default App;
