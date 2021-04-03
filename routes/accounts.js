const db = require('../utils/database')

function getAccount(request, response) {
    const users = await db.getUsers();
    response.status(200).json(users);
};

// sample data
// {
//     "username": "test",
//     "password": "password",
//     "email": "test@email.com"
// }
function addAccount(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let email = request.body.email;

    db.createUser(username, password, email);

    response
        .status(201)
        .json({ status: "success", message: "Account added." });
};

module.exports = {
    getAccount,
    addAccount
}