const xhttp = new XMLHttpRequest();
const path = "http://localhost:3000";
var count = 0; // keeps track of total # of quotes

// makes get request for getting all quotes
let getAll = function(){
    xhttp.onreadystatechange = function (){
    	if (this.readyState == 4 && this.status == 200) {
		    console.log(this.responseText);
		    let arr = JSON.parse(this.responseText);
	    	console.log(arr);

    		for(let i = 0; i < arr.length; i++) {
                render(arr[i]);
     		}
    	}
    }
	
    xhttp.open("GET", path + "/stats", true);
    xhttp.send();
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
