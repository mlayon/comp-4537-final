const API_BASE_URL = "https://final-4537.herokuapp.com";

const METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

let jwt;

function ajaxRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        let requestData = {
            url: API_BASE_URL + path,
            type: method,
            headers: {
                "authToken": jwt
            },
            dataType: 'json',
            contentType: 'application/json',
            success: function(data, status, xhr) {
                resolve(data);
            },
            error: function(xhr, textStatus, errorMessage) {
                reject(JSON.parse(xhr.responseText));
            }
        }

        if (data)
            requestData['data'] = JSON.stringify(data);

        console.log('Sending ajax request:', requestData);
        $.ajax(requestData);
    })
}