import React, { Component } from 'react';
import Milo from '../resources/images/milo2.jpg'
import Cats from '../resources/images/cats.jpg'
import Ppgrl from '../resources/images/ppgirl.png'
import Logo from '../resources/images/logo.png';
class About extends Component {
	render(){
		return (<div>
				<div className="center">
				<img className="med" src={Milo} alt="Dog outside"/>
				<img className="med" src={Cats} alt="Two cats"/>
				</div>
				<p id="aboutBlurb">
					Welcome to frrbnb! As the caretaker for the three fur-babies pictured above, I know what it's 
					like to worry about boarding your pets when you go away on vacation. Worry no more! Frrbnb gives 
					you an alternative to traditional kennels. You can rest easy knowing your pet is enjoying a vacation 
					in another animal lover's home instead of staying in a noisy, stressful and isolating kennel 
					environment. Make a profile, browse reviews, and book Fido or Fluffy a stay with a host near you the 
					next time you're out of town.</p>
				<div className="center">
					<img className="med" src={Logo} alt="frrbnb" />
				</div>
				<div id="aboutDemo">
						<div className="center">
						<img className="sm" src={Ppgrl} alt=""/>
						</div>
					<p className="sm">
						This project was built using React.js on the client side, Sqlite3 and Python's FlaskAPI framework 
						on the server side.
					</p>
					<p className="sm">
						If you like what you see, check out the code 
						on <a href="https://github.com/vbetts/frrbnb">Github</a>. While you're there, why not have a look 
						at <a href="https://github.com/vbetts/solar-system">my</a> <a href="https://github.com/vbetts/mmo-asteroidz">other</a> <a href="https://github.com/vbetts/exercism.io">projects</a>?
					</p>
					<p className="sm">
						I am a web developer with 3 years of experience and I'm currently looking for jobs in Victoria, BC or with a company which is open to remote work- find me on <a href="https://www.linkedin.com/in/victoria-betts-94512230">LinkedIn</a> or contact me by e-mail at toribetts[at]gmail[dot]com.
					</p>
				</div>
			</div>);
	}
}

export default About
