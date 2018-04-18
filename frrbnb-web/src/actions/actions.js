import { TOGGLE_CREATE_HOST, SELECT_CITY } from '../constants/constants'

export function toggleCreateHost(isHost){
	return { type : TOGGLE_CREATE_HOST, isHost }
}
export function selectCity(citySelection){
	return { type : SELECT_CITY, citySelection }
}
