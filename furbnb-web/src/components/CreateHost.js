import React from 'react';

const CreateHost = ({isHost}) => {
	if (isHost){
		return <div>"Create Host"</div>;
	} else {
		return null;
	}
}

export default CreateHost
