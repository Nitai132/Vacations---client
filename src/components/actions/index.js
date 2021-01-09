import axios from 'axios';


export const AuthenticationSucess = 
    detailsObj => {
        return dispatch => 
        axios.post(`/auth/login`, detailsObj)
        .then(() => {
            return dispatch({
                type: 'SUCCESS',
                payload: true
            })
        })
        .catch(() => {
            return dispatch({
                type: 'FAILED',
                payload: false
            })
        })
    }

export const AuthenticationFailed = () => {
    return {
        type: 'FAILED',
        payload: false
    };
}

export const logUserOut = () => {
    return dispatch => {
        dispatch({
            type: 'PENDING',
            payload: {
               username: 'pending',
               isAdmin: 'pending',
                pending: true
            }
        }) 
        axios.get(`/auth/logout`)
        .then(() => {
            return dispatch({
                type: 'lOGGED_OUT',
                payload: {
                    username: 'guest',
                    isAdmin: 0,
                    pending: false
                }
            })
        });
    }
}

export const loginDetails =  () => {
    return dispatch => {
     dispatch({
         type: 'PENDING',
         payload: {
            username: 'pending',
            isAdmin: 'pending',
             pending: true
         }
     })    
    axios.get('/userDetails')
    .then((data) => {
        return dispatch({
            type: 'USER_DETAILS',
            payload: {
                username: data.data.userDetails.username,
                isAdmin: data.data.userDetails.isAdmin,
                pending: false
            }
        })
    })
    .catch(() => {
        return dispatch({
            type: 'lOGGED_OUT',
            payload: {
                username: 'guest',
                isAdmin: 0,
                pending: false
            }
        })
    })
}
}

