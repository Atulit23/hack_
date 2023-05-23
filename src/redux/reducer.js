const initialState = {
    data: []
}

function twReducer(state = [{}], action) {
    switch (action.type) {
        case 'ADD_MSG':
            return [action.text]
        default:
            return state
    }
}

export default twReducer;

