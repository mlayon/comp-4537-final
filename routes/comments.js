// sample request
// localhost:3000/comment?id=1
function getComment(request, response) {
    let post_id = request.query.id;
    pool.query(
        "SELECT * FROM comment WHERE post_id = $1", [post_id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
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

    pool.query(
        "INSERT INTO comment (content, user_id, post_id) VALUES ($1, $2, $3)", [content, user_id, post_id],
        (error) => {
            if (error) {
                throw error;
            }
            response
                .status(201)
                .json({ status: "success", message: "Comment added." });
        }
    );
};

// sample json
// {
//     "content": "updated comment",
//     "comment_id": 1
// }
function updateComment(request, response) {
    let content = request.body.content;
    let comment_id = request.body.comment_id;

    pool.query(
        "UPDATE commenttent = $1 WHERE comment_id = $2", [content, comment_id],
        (error) => {
            if (error) {
                throw error;
            }
            response
                .status(201)
                .json({ status: "success", message: "Comment updated." });
        }
    );
};

// sample request
// localhost:3000/comment?id=1
function deleteComment(request, response) {
    let comment_id = request.query.id;

    pool.query(
        "DELETE FROM comment WHERE comment_id = $1", [comment_id],
        (error) => {
            if (error) {
                throw error;
            }
            response
                .status(201)
                .json({ status: "success", message: "Comment deleted." });
        }
    );
};

module.exports = {
    getComment,
    addComment,
    updateComment,
    deleteComment
}