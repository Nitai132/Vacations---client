const userDetails = (state = defaultState, action) => {
    switch (action.type) {
        case 'USER_DETAILS': 
            const { payload } = action;
            return payload;
        case 'lOGGED_OUT': 
            return action.payload
        case 'PENDING':
            return action.payload
        default: 
            return state;
    }
}


const defaultState = {
    username: 'guest',
    isAdmin: 0,
    pending: true
}

export default userDetails;