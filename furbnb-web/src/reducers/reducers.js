import { combineReducers } from 'redux'
import { TOGGLE_CREATE_HOST, SELECT_CITY } from '../constants/constants'

function accounts(state=[], action){
	switch (action.type){
		case TOGGLE_CREATE_HOST:
			return Object.assign({}, state, {
				isHost: !state.isHost
			});
		case SELECT_CITY:
			return Object.assign({}, state, {
				citySelection: action.citySelection
			});
		default:
			return state
	}
}

const frrbnbApp = combineReducers({
		  accounts
})
 
export default frrbnbApp
