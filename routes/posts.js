// sample request
// localhost:3000/post?id=1
function getPost(request, response) {
    let post_id = request.query.id;
    pool.query(
        "SELECT * FROM post WHERE post_id = $1", [post_id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

function getAllPosts(request, response) {
    pool.query("SELECT * FROM post", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
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

    pool.query(
        "INSERT INTO post (post_date, title, topic, content, user_id) VALUES ($1, $2, $3, $4, $5)", [post_date, title, topic, content, user_id],
        (error) => {
            if (error) {
                throw error;
            }
            response.status(201).json({ status: "success", message: "Post added." });
        }
    );
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

    pool.query(
        "UPDATE post SET title = $1, topic = $2, content = $3 WHERE post_id = $4", [title, topic, content, post_id],
        (error) => {
            if (error) {
                throw error;
            }
            response
                .status(201)
                .json({ status: "success", message: "Post updated." });
        }
    );
};

// sample request
// localhost:3000/post?id=1
function deletePost(request, response) {
    let post_id = request.query.id;

    // delete comments referencing the post first
    pool.query("DELETE FROM comment WHERE post_id = $1", [post_id], (error) => {
        if (error) {
            throw error;
        }
    });

    // delete actual post
    pool.query("DELETE FROM post WHERE post_id = $1", [post_id], (error) => {
        if (error) {
            throw error;
        }
        response.status(201).json({ status: "success", message: "Post deleted." });
    });
};

module.exports = {
    getPost,
    getAllPosts,
    addPost,
    updatePost,
    deletePost
}