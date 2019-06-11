import axios from 'axios';
import Api from '@/services/api/Api'

const API_URL = 'https://plants.ml/api/auth'
const USER_URL = 'https://plants.ml/api/user'
const REFRESH_TOKEN_URL = 'https://plants.ml/jwt/refresh-token/'

import { authHeader } from '@/helpers/authHeader'

let users = [
    { id: 1, name: 'Damian', username: 'test@test.pl', password: 'lol123321' },
]

export const UserService = {
    login,
    logout,
    register,
    currentUser,
    getAllUsers,
    getUserDetails,
    changePassword,
    updateUser,    
    refreshToken
};

function updateUser(user) {
    console.log("Updating user")
    console.log(user)
    
    return Api().put(USER_URL + '/' + user.id + '/', user, {
        headers: authHeader()
    })
        .then(response => {
            return response.data;
        });    
}

function changePassword(passwordSet) {
    return Api().post(API_URL + '/' + 'password/', passwordSet, {
        headers: authHeader()
    })
        .then(response => {
            return response.data;
        });    
}

function getUserDetails() {
    return Api().get(API_URL + '/' + 'user/', {
        headers: authHeader()
    })
        .then(response => {
            return response.data;
        });    
}

function refreshToken(token) {
    return Api().post(REFRESH_TOKEN_URL,
        { "token" : token }
    )
        .then(response => {
            return response.data;
        });    
}

function getAllUsers() {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(users);
        }, 1000);
    });
}

function login(username, password) {
    return Api().post(API_URL + '/login/',
        { useremail: username, password: password }
    )
        .then(response => {
            console.log("AFTER LOGIN USER")
            console.log(response.data)

            let user = {
                useremail: username,
                token: response.data.token,
                last_token_request: new Date()
            }
                    
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function currentUser() {
    return Api().get(API_URL + '/current')
        .then(handleResponse)
        .then(responseData => {
            return responseData
        })
}

function logout() {
    localStorage.removeItem('user');
}

function register(user) {
    console.log("REGISTRATION")
    console.log(user)
    return Api().post(API_URL + '/register/',
        { 
            username: user.name,
            email: user.username,
            first_name: user.name,
            last_name: user.name, 
            password: user.password,
            phone_number: user.phone 
        }
    )
        .then(response => {
            let user = {}
            console.log("Odp: ")
            console.log(response)

            return user;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

