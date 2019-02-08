import axios from 'axios';

import * as actionTypes from './actionTypes';

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch({
            type: actionTypes.AUTH_START
        });
        const AuthData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBmk0oMVZoUTOwy5ZjqzohzmTaoiK9zgfQ';
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBmk0oMVZoUTOwy5ZjqzohzmTaoiK9zgfQ'
        }
        axios.post(url, AuthData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch({
                    type: actionTypes.AUTH,
                    token: response.data.idToken,
                    userId: response.data.localId
                });
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: actionTypes.AUTH_FAIL,
                    error: error.response.data.error
                })
            })
    }
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

const checkAuthTimeout = experationTime => {
    console.log(experationTime);
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, experationTime * 1000)
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token) {
            dispatch({
                type: actionTypes.AUTH,
                token: token,
                userId: userId
            });
        }
    }
};
