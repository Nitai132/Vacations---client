const authentication = (state = defaultState, action) => {
    switch (action.type) {
        case 'SUCCESS': 
            const { payload } = action;
            return {
                authenticated: payload   
            } 
        case 'FAILED': 
            return {
                authenticated: action.payload
            }
        default: 
            return state;
    }
}


const defaultState = {
    authenticated: true
}

export default authentication;