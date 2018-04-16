import React from 'react';
import CreateHost from './CreateHost';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';


const CreateBasic = ({ isHost=false, handleToggle }) => (
	<div>
		<TextField floatingLabelText="E-mail Address"/>
		<Toggle label="Create Host Account" toggled={isHost} onToggle={handleToggle}/>
		<CreateHost isHost={isHost} />
	</div>
)

 
export default CreateBasic



