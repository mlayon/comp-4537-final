let getAll = function() {
    try {
        let resp = ajaxRequest(METHOD.GET, '/stats');
    } catch (error) {
        alert(error['data']);
    }

    for (let i = 0; i < arr.length; i++) {
        render(resp['data'][i]);
    }
}

// renders dom elements for each endpoint stat
let render = function(obj) {
    let method = obj.method;
    let endpoint = obj.endpoint;
    let requests = obj.requests;

    // quote related elements
    let row = document.createElement("tr");
    let td_method = document.createElement("td");
    let td_endpoint = document.createElement("td");
    let td_requests = document.createElement("td");

    td_method.innerHTML = method;
    td_endpoint.innerHTML = endpoint;
    td_requests.innerHTML = requests;


    // appending elements
    row.appendChild(td_method);
    row.appendChild(td_endpoint);
    row.appendChild(td_requests);

    document.getElementById("stats-table").appendChild(row);

}

getAll();