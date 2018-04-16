import { TOGGLE_CREATE_HOST } from '../constants/constants'

export function toggleCreateHost(isHost){
	return { type : TOGGLE_CREATE_HOST, isHost }
}
