import axios from 'axios';
import Api from '@/services/api/Api'

const API_URL = '/auth'

let users = [
    { id: 1, name: 'Damian', username: 'test@test.pl', password: 'lol123321' },
]

export const UserService = {
    login,
    logout,
    register,
    currentUser,
    getAllUsers
};

function getAllUsers() {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(users);     
        }, 1000);
    });
}

function login(username, password) {
    const user = {
        username: username,
        password: password
    };

    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            
            for(let ia = 0; ia < users.length; ia++) {
                if(users[ia].username === user.username && users[ia].password === user.password) {
                    localStorage.setItem('user', JSON.stringify(user));
                    resolve(user);
                }
            }

            let error = {
                response: { 
                    message: "Wrong data!",
                    status: 401
                }
            }
            reject(error);
        }, 1000);
    });
    /*
    return Api().post(API_URL + '/login',
        { user }
    )
        .then(response => {
            let user = response.data.user

            if(user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
    */
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
    return new Promise(resolve => {
        setTimeout(function () {
            users.push(user); 
            resolve(user);     
        }, 1000);
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

