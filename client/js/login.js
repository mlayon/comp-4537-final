// Login handler
$('#submit').click(async function(event) {
    event.preventDefault();

    let data = {
        email: $('#email').val(),
        password: $('#pass').val(),
    }

    let resp
    try {
        resp = await ajaxRequest(METHOD.POST, '/login', data)
        window.localStorage.setItem('jwt', resp['data']);
        window.location = './admin.html';
    } catch (error) {
        resp = error;
        alert(resp['data']);
    }
});