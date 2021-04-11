const { formatSuccess, formatError } = require("../../utils/respFormat");
const router = require("express").Router();
const db = require("../../utils/database");
const _ = require("lodash");

// sample req
// localhost:3000/comment?id=1
async function getComment(req, res) {
    const postID = req.query.postId;
    const comments = await db.getPostComments(postID);

    if (!comments || comments.length == 0)
        return res
            .status(404)
            .json(formatError(`No comments found for post: ${postID}`));

    res.status(200).json(formatSuccess(comments));
}

// sample json
// {
//     "content": "test comment",
//     "user_id": 2,
//     "post_id": 2
// }
async function addComment(req, res) {
    const comment = _.pick(req.body, ["content", "post_id"]);
    await db.addComment(comment.content, req.user.user_id, comment.post_id);
    res.status(201).json(formatSuccess("Comment added."));
}

// sample json
// {
//     "content": "updated comment",
//     "comment_id": 1
// }
async function updateComment(req, res) {
    const newComment = _.pick(req.body, ["content", "comment_id"]);
    const comment = await db.getComment(newComment.comment_id);

    if (!comment)
        return res.status(404).json(formatError(`No comment found with id: ${newComment.comment_id}`));

    if (!req.user.is_admin && req.user.user_id != comment.user_id)
        return res.status(401).json(formatError("This is not your comment."));

    await db.updateComment(newComment.content, comment.comment_id);
    res.status(200).json(formatSuccess("Comment updated."));
}

// sample req
// localhost:3000/comment?id=1
async function deleteComment(req, res) {
    const comment_id = req.query.id;
    const comment = await db.getComment(comment_id);

    if (!comment)
        return res.status(404).json(formatError(`No comment found with id: ${comment_id}`));

    if (!req.user.is_admin && req.user.user_id != comment.user_id)
        return res.status(401).json(formatError("This is not your comment."));

    await db.deleteComment(comment_id);
    res.status(200).json(formatSuccess("Comment deleted."));
}

router.get("/", getComment);
router.post("/", addComment);
router.put("/", updateComment);
router.delete("/", deleteComment);

module.exports = router;