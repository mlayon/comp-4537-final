const url = new URL(window.location).searchParams;
const postId = url.get("id");

async function loadComments() {
	console.log(window.location);

	let post = await getPost(postId);
	let comments = await getPostComments(postId);

	if (post["status"] !== "success") {
		alert(post["data"]);
		return (window.location = "./login.html");
	}

	renderPost(post["data"]);

	for (let comment of comments["data"]) renderComment(comment);
}

function renderPost(post) {
	console.log("Post", post);

	document.getElementById("title").innerHTML = post.title;
	document.getElementById("topic").innerHTML = post.topic;
	document.getElementById("content").innerHTML = post.content;
}

// renders dom elements for each post
function renderComment(comment) {
	console.log("Comments", comment);

	// post related elements
	let row = document.createElement("tr");
	let td_content = document.createElement("td");

	row.id = comment.comment_id;
	td_content.innerHTML = comment.content;

	// appending elements
	row.appendChild(td_content);

	document.getElementById("comments-table").appendChild(row);
}

function configureButtons() {
	$("#editButton").click(function () {
		window.location = "./edit.html?id=" + postId;
	});

	$("#deleteButton").click(function () {
		console.log("postid: ", postId);
		deletePost(postId);
		alert("Post deleted");
		return (window.location = "./index.html");
	});

	$("#saveButton").click(function () {
		let title = document.getElementById("title").value;
		let topic = document.getElementById("topic").value;
		let content = document.getElementById("content").value;

		console.log("postid: ", postId);
		updatePost(title, topic, content, postId);
		alert("Post updated");
		return (window.location = "./post.html?id=" + postId);
	});
}

configureButtons();
loadComments();
