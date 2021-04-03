// sample request
// localhost:3000/comment?id=1
function getComment(request, response) {
    let post_id = request.query.id;

    const comment = await db.getComment(content, user_id, post_id);

    response
        .status(201)
        .json(comment);
};

// sample json
// {
//     "content": "test comment",
//     "user_id": 2,
//     "post_id": 2
// }
function addComment(request, response) {
    let content = request.body.content;
    let user_id = request.body.user_id;
    let post_id = request.body.post_id;

    db.addComment(content, user_id, post_id);

    response
        .status(201)
        .json({ status: "success", message: "Comment added." });
};

// sample json
// {
//     "content": "updated comment",
//     "comment_id": 1
// }
function updateComment(request, response) {
    let content = request.body.content;
    let comment_id = request.body.comment_id;

    db.updateComment(content, comment_id);
};

// sample request
// localhost:3000/comment?id=1
function deleteComment(request, response) {
    let comment_id = request.query.id;

    deleteComment(comment_id);
};

module.exports = {
    getComment,
    addComment,
    updateComment,
    deleteComment
}