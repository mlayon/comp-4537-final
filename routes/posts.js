const { formatSuccess, formatError } = require('../utils/respFormat');
const router = require('express').Router();

const db = require('../utils/database')

// sample request
// localhost:3000/post?id=1
function getPost(request, response) {
    let post_id = request.query.id;
    db.getPost(post_id);
};

function getAllPosts(request, response) {
    db.getAllPosts();

    response.status(200).json(results.rows);
};

// sample json
// {
//     "post_date": "'2021-01-22 19:10:25'",
//     "title": "test post",
//     "topic": "test topic",
//     "content": "test content",
//     "user_id": 2

// }
function addPost(request, response) {
    let post_date = request.body.post_date;
    let title = request.body.title;
    let topic = request.body.topic;
    let content = request.body.content;
    let user_id = request.body.user_id;

    db.createPost(post_date, title, topic, content, user_id);
};

// sample json
// {
//     "title": "updated post",
//     "topic": "updated topic",
//     "content": "updated content",
//     "post_id": 2
// }
function updatePost(request, response) {
    let title = request.body.title;
    let topic = request.body.topic;
    let content = request.body.content;
    let post_id = request.body.post_id;

    db.updatePost(title, topic, content, post_id);
};

// sample request
// localhost:3000/post?id=1
function deletePost(request, response) {
    let post_id = request.query.id;

    db.deletePost(post_id);
};

module.exports = {
    getPost,
    getAllPosts,
    addPost,
    updatePost,
    deletePost
}