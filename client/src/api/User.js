const BL_URL = '/api/';

export default {
    register: (username, password) => {
        const requestUrl = BL_URL + 'register';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        };

        return new Promise((resolve, reject) => {
            fetch(requestUrl, requestOptions)
                .then((res) => {
                    if (res.ok) {
                        console.log('Registered successfully');
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });
    },

    login: (username, password) => {
        const requestUrl = BL_URL + 'login';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        };

        return new Promise((resolve, reject) => {
            fetch(requestUrl, requestOptions)
                .then((res) => {
                    if (res.ok) {
                        console.log('Logged in successfully');
                        console.log(res);;
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });
    },

    logout: () => {
        const requestUrl = BL_URL + 'logout';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return new Promise((resolve, reject) => {
            fetch(requestUrl, requestOptions)
                .then(res => {
                    if (res.ok) {
                        console.log('Logged out successfully');
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });
    },

    my: () => {
        const requestUrl = BL_URL + 'my';

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return new Promise((resolve, reject) => {
            fetch(requestUrl, requestOptions)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        reject();
                    }
                })
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    },

    edit: function (data) {
        const requestUrl = BL_URL + 'edit';


        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'goal': data.goal ? data.goal : -1,
                'weight': data.weight ? data.weight : -1,
                'height': data.height ? data.height : -1,
            })
        };

        return new Promise((resolve, reject) => {
            fetch(requestUrl, requestOptions)
                .then(res => res.json())
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
}