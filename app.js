const express = require("express");
const querystring = require("querystring");
const cors = require("cors");
const { pool } = require("./config");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const getAccounts = (request, response) => {
	pool.query("SELECT * FROM account", (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

// sample data
// {
//     "username": "test",
//     "password": "password",
//     "email": "test@email.com"
// }
const addAccount = (request, response) => {
	let username = request.body.username;
	let password = request.body.password;
	let email = request.body.email;

	pool.query(
		"INSERT INTO account (username, password, email) VALUES ($1, $2, $3)",
		[username, password, email],
		(error) => {
			if (error) {
				throw error;
			}
			response
				.status(201)
				.json({ status: "success", message: "Account added." });
		}
	);
};

// sample request
// localhost:3000/post?id=1
const getPost = (request, response) => {
	let post_id = request.query.id;
	pool.query(
		"SELECT * FROM post WHERE post_id = $1",
		[post_id],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).json(results.rows);
		}
	);
};

const getAllPosts = (request, response) => {
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
const addPost = (request, response) => {
	let post_date = request.body.post_date;
	let title = request.body.title;
	let topic = request.body.topic;
	let content = request.body.content;
	let user_id = request.body.user_id;

	pool.query(
		"INSERT INTO post (post_date, title, topic, content, user_id) VALUES ($1, $2, $3, $4, $5)",
		[post_date, title, topic, content, user_id],
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
const updatePost = (request, response) => {
	let title = request.body.title;
	let topic = request.body.topic;
	let content = request.body.content;
	let post_id = request.body.post_id;

	pool.query(
		"UPDATE post SET title = $1, topic = $2, content = $3 WHERE post_id = $4",
		[title, topic, content, post_id],
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
const deletePost = (request, response) => {
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

// sample request
// localhost:3000/comment?id=1
const getComment = (request, response) => {
	let post_id = request.query.id;
	pool.query(
		"SELECT * FROM comment WHERE post_id = $1",
		[post_id],
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
const addComment = (request, response) => {
	let content = request.body.content;
	let user_id = request.body.user_id;
	let post_id = request.body.post_id;

	pool.query(
		"INSERT INTO comment (content, user_id, post_id) VALUES ($1, $2, $3)",
		[content, user_id, post_id],
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
const updateComment = (request, response) => {
	let content = request.body.content;
	let comment_id = request.body.comment_id;

	pool.query(
		"UPDATE comment SET content = $1 WHERE comment_id = $2",
		[content, comment_id],
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
const deleteComment = (request, response) => {
	let comment_id = request.query.id;

	pool.query(
		"DELETE FROM comment WHERE comment_id = $1",
		[comment_id],
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

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app
	.route("/account")
	// GET /account
	.get(getAccounts)
	// POST /account
	.post(addAccount);


app
	.route("/post")
	// GET /post
	.get(getPost)
	// POST /post
	.post(addPost)
	// PUT /post
	.put(updatePost)
	// DELETE /post
	.delete(deletePost);

app
	.route("/post/all")
	// GET /post/all
	.get(getAllPosts)


app
	.route("/comment")
	// GET /comment
	.get(getComment)
	// POST /comment
	.post(addComment)
	// PUT /comment
	.put(updateComment)
	// DELETE /comment
	.delete(deleteComment);

// app
// 	.route("/stats")
// 	// GET /stats
// 	.get(getStats)
// 	// PUT /states
// 	.put(updateStats)

// app
// 	.route("/admin")
// 	// POST /admin
// 	.post(loginAdmin)

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
