// Code comes here on handle submit in Login.js
import { SET_AUTHENTICATED, SET_USER_TYPE } from "../types";
import axios from 'axios';

export const loginUser = (userData, navigate) => (dispatch) => {
    axios
        .post('/loginUser', userData)
        .then(res => {
            localStorage.setItem('uid', res.data.user.uid)
            setAuthorizationHeader(res.data.token)
            //localStorage.setItem('userType', res.data.userType);
            console.log("Logged in successfully!!")
            navigate('/');
            dispatch({
                type: SET_AUTHENTICATED
            })
            dispatch({
                type: SET_USER_TYPE,
                payload: res.data.userType
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getUserDetails = (uidRequested) => (dispatch) => {
    console.log('INSIDE', uidRequested)
    axios
        .post('/getUserDetails', uidRequested)
        .then(res => {
            console.log('Printing', res.data);
            dispatch({
                type: SET_USER_TYPE,
                payload: res.data.userType
            })
        })
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}
