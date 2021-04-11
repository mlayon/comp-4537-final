$(document).ready(() => {
    // Login handler
    $('#submit').click(async(event) => {
        event.preventDefault();
        let email = $('#email').val();
        let password = $('#pass').val();

        try {
            let resp = await login(email, password);
            console.log(resp);
            if (resp['status'] === 'success') {
                window.location = './index.html';
            } else {
                if (typeof resp['data'] === 'object')
                    alert(resp['data'][Object.keys(resp['data'])[0]]);
                else
                    alert(resp['data']);
            }
        } catch (error) {
            let resp = error;
            console.log(resp);
            alert(resp['data']);
        }
    });

    $('#register').click(async(event) => {
        event.preventDefault();
        let email = $('#email').val();
        let password = $('#pass').val();

        try {
            let resp = await createUser(email, password);
            console.log(resp);
            if (resp['status'] === 'success') {
                window.location = './index.html';
            } else {
                if (typeof resp['data'] === 'object')
                    alert(resp['data'][Object.keys(resp['data'])[0]]);
                else
                    alert(resp['data']);
            }
        } catch (error) {
            let resp = error;
            console.log(resp);
            alert(resp['data']);
        }
    });
});