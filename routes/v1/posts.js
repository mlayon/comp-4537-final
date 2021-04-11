const { formatSuccess, formatError } = require('../../utils/respFormat');
const db = require('../../utils/database');
const _ = require('lodash');

const router = require('express').Router();

// sample request
// localhost:3000/post?id=1
async function getPost(req, resp) {
    let post_id = req.query.id;
    let post = await db.getPost(post_id);

    if (!post)
        return resp.status(404).json(formatError(`No post found with id: ${post_id}`));

    resp.status(200).json(formatSuccess(post));
};

async function getAllPosts(req, resp) {
    let posts = await db.getAllPosts();
    resp.status(200).json(formatSuccess(posts));
};

// sample json
// {
//     "post_date": "'2021-01-22 19:10:25'",
//     "title": "test post",
//     "topic": "test topic",
//     "content": "test content",
//     "user_id": 2

// }
function addPost(req, resp) {
    let post = _.pick(req.body, ['title', 'topic', 'content']);
    db.createPost(post.title, post.topic, post.content, req.user.user_id);
    resp.status(200).json(formatSuccess("Post created."))
};

// sample json
// {
//     "title": "updated post",
//     "topic": "updated topic",
//     "content": "updated content",
//     "post_id": 2
// }
async function updatePost(req, resp) {
    const newPost = _.pick(req.body, ['title', 'topic', 'content', 'post_id']);
    const originalPost = await db.getPost(newPost.post_id);

    if (!req.user.is_admin && req.user.user_id != originalPost.user_id)
        return resp.status(401).json(formatError("This is not your post."));

    db.updatePost(newPost.title, newPost.topic, newPost.content, newPost.post_id);
    resp.status(200).json(formatSuccess('Post updated.'))
};

// sample req
// localhost:3000/post?id=1
async function deletePost(req, resp) {
    let post_id = req.query.id;
    const originalPost = await db.getPost(post_id);

    if (!req.user.is_admin && req.user.user_id != originalPost.user_id)
        return resp.status(401).json(formatError("This is not your post."));

    db.deletePost(post_id);
    resp.status(200).json(formatSuccess('Post deleted.'))
};

router.get('/', getPost);
router.get('/all', getAllPosts);
router.post('/', addPost);
router.put('/', updatePost);
router.delete('/', deletePost);

module.exports = router;