const { formatSuccess, formatError } = require('../utils/respFormat');
const router = require('express').Router();
const db = require('../utils/database');
const _ = require('lodash');

// sample req
// localhost:3000/comment?id=1
async function getComment(req, res) {
    let commentID = req.query.id;
    const comment = await db.getComment(commentID);

    if (!comment)
        return res.status(404).json(formatError(`No comment found with id: ${commentID}`));

    res.status(200).json(formatSuccess(comment));
};

// sample json
// {
//     "content": "test comment",
//     "user_id": 2,
//     "post_id": 2
// }
async function addComment(req, res) {
    const comment = _.pick(req.body, ['content', 'post_id']);
    await db.addComment(comment.content, req.user.user_id, comment.post_id);
    res.status(201).json(formatSuccess("Comment added."));
};

// sample json
// {
//     "content": "updated comment",
//     "comment_id": 1
// }
async function updateComment(req, res) {
    const comment = _.pick(req.body, ['content', 'comment_id']);
    await db.updateComment(content, comment_id);
    res.status(200).json(formatSuccess("Comment updated."));
};

// sample req
// localhost:3000/comment?id=1
async function deleteComment(req, res) {
    let comment_id = req.query.id;
    await db.deleteComment(comment_id);
    res.status(200).json(formatSuccess("Comment deleted."))
};

router.get('/', getComment);
router.post('/', addComment);
router.put('/', updateComment);
router.delete('/', deleteComment);

module.exports = router;