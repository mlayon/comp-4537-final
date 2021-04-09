// Login handler
$('#submit').click(async (event) => {
    event.preventDefault();
    let email = $('#email').val();
    let password = $('#pass').val();

    try {
        let resp = await login(email, password);
        if (resp['status'] === 'success')
            window.location = './index.html';
        else
            alert(resp['data']);

    } catch (error) {
        let resp = error;
        alert(resp['data']);
    }
});