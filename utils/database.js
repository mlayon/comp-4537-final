const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const RESPONSE_TYPE = {
    NONE: 'NONE',
    SINGLE: 'SINGLE',
    MANY: 'MANY'
}

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

async function queryDB(query, args = null, responseType = RESPONSE_TYPE.NONE) {
    const result = await pool.query(query, args)
    const rows = result.rows;

    switch (responseType) {
        case RESPONSE_TYPE.NONE:
            return;
        case RESPONSE_TYPE.SINGLE:
            return rows[0];
        case RESPONSE_TYPE.MANY:
            return rows;
    }
}

async function getUsers() {
    return await queryDB("SELECT * FROM account", responeType = RESPONSE_TYPE.MANY);
}

async function getUser(email) {
    return await queryDB("SELECT * FROM account WHERE email = $1", [email], RESPONSE_TYPE.SINGLE);
}

async function createUser(username, password, email) {
    return await queryDB("INSERT INTO account (username, password, email) VALUES ($1, $2, $3)", [username, password, email]);
}

async function getPost(post_id) {
    return await queryDB("SELECT * FROM comment WHERE post_id = $1", [post_id], RESPONSE_TYPE.SINGLE);
}

async function addComment(content, user_id, post_id) {
    return await queryDB("INSERT INTO comment (content, user_id, post_id) VALUES ($1, $2, $3)", [content, user_id, post_id], RESPONSE_TYPE.NONE);
}

async function updateComment(content, comment_id) {
    return await queryDB("UPDATE commenttent = $1 WHERE comment_id = $2", [content, comment_id], RESPONSE_TYPE.NONE);
}

async function deleteComment(comment_id) {
    return await queryDB("DELETE FROM comment WHERE comment_id = $1", [comment_id], RESPONSE_TYPE.NONE);
}

async function getPost(post_id) {
    return await queryDB("SELECT * FROM post WHERE post_id = $1", [post_id], RESPONSE_TYPE.SINGLE);
}

async function getAllPosts() {
    return await queryDB("SELECT * FROM post", responseType = RESPONSE_TYPE.MANY);
}

async function createPost(post_date, title, topic, content, user_id) {
    return await queryDB("INSERT INTO post (post_date, title, topic, content, user_id) VALUES ($1, $2, $3, $4, $5)", [post_date, title, topic, content, user_id], responseType = RESPONSE_TYPE.MANY);
}

async function updatePost(title, topic, content, post_id) {
    return await queryDB("UPDATE post SET title = $1, topic = $2, content = $3 WHERE post_id = $4", [title, topic, content, post_id], responseType = RESPONSE_TYPE.NONE);
}

async function deletePost(post_id) {
    await queryDB("DELETE FROM comment WHERE post_id = $1", [post_id], responseType = RESPONSE_TYPE.NONE);
    return await queryDB("DELETE FROM post WHERE post_id = $1", [post_id], responseType = RESPONSE_TYPE.NONE);
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    getPost,
    addComment,
    updateComment,
    deleteComment,
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}