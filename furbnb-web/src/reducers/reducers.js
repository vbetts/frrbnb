import { combineReducers } from 'redux'
import { TOGGLE_CREATE_HOST } from '../constants/constants'

function accounts(state=[], action){
	switch (action.type){
		case TOGGLE_CREATE_HOST:
			return Object.assign({}, state, {
				isHost: !state.isHost
			});
		default:
			return state
	}
}

const frrbnbApp = combineReducers({
		  accounts
})
 
export default frrbnbApp
