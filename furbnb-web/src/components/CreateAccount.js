import React from 'react';
import CreateBasic from './CreateBasic';
import { connect } from 'react-redux';
import { toggleCreateHost } from '../actions/actions';


const mapStateToProps = state => {
		return {
					isHost : state.accounts.isHost
				}
}

const mapDispatchToProps = dispatch => ({
		  handleToggle: () => dispatch(toggleCreateHost())
})

const CreateAccount = connect(mapStateToProps, mapDispatchToProps)(CreateBasic)
export default CreateAccount
