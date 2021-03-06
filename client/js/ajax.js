const apiVersion = "v1";

const API_BASE_URL = `https://final-4537.herokuapp.com/${apiVersion}`;
// const API_BASE_URL = `http://127.0.0.1:3000/${apiVersion}`;


// Not the best spot, but this a common module. Should be moved to a different file or such.
const checkIfLoggedIn = () => {
    let tokens = window.location.toString().split('/');
    let location = tokens.pop();

    if (location === 'login' && !window.localStorage.getItem('jwt'))
        window.location = './login.html';
}

const METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

const ajaxRequest = (method, path, data = null) => {
    return new Promise((resolve, reject) => {
        let requestData = {
            url: API_BASE_URL + path,
            type: method,
            headers: {
                "authToken": window.localStorage.getItem('jwt')
            },
            dataType: 'json',
            contentType: 'application/json',
            success: function(data, status, xhr) {
                resolve(data);
            },
            error: function(xhr, textStatus, errorMessage) {
                let error = JSON.parse(xhr.responseText);
                error['success'] = false; // Should be set with utility function
                reject(error);
            }
        }

        if (data)
            requestData['data'] = JSON.stringify(data);

        console.log('Sending ajax request:', requestData);
        $.ajax(requestData);
    })
}

$(document).ready(() => {
    checkIfLoggedIn();
});