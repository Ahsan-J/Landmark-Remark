var generalVarables = {

};
export default function (state = generalVarables, action) {
	switch (action.type) {
		case 'Something':
			return state = {
				...state
			}
		default:
			return state;
	}
}