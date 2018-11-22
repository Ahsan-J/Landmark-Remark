var generalVarables = {
  markers : []
};
export default function (state = generalVarables, action) {
	switch (action.type) {
    case 'ADD_MARKER':
			return state = {
        ...state,
        markers : [...action.markers]
      }
		default:
			return state;
	}
}