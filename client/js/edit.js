const url = new URL(window.location).searchParams;
const postId = url.get("id");
const emptyPost = {
	title: "",
	topic: "",
	content: "",
};

const loadPost = async () => {
	console.log(window.location);

	// check if we're creating a new post
	if (postId === "new") {
		renderPost(emptyPost);
	} else {
		let post = await getPost(postId);

		if (post["status"] !== "success") {
			alert(post["data"]);
			return (window.location = "./login.html");
		}

		renderPost(post["data"]);
	}
};

const renderPost = (post) => {
	console.log("Post", post);

	document.getElementById("title").innerHTML = post.title;
	document.getElementById("topic").innerHTML = post.topic;
	document.getElementById("content").innerHTML = post.content;
};

const configureButtons = () => {
	// Save button for edit.html
	$("#saveButton").click(() => {
		let title = document.getElementById("title").value;
		let topic = document.getElementById("topic").value;
		let content = document.getElementById("content").value;
		console.log("postid: ", postId);

		if (isAllCorrectLength(title, topic, content)) {
			if (postId === "new") {
				createPost(title, topic, content);
				alert("Post created");
				return (window.location = "./index.html");
			} else {
				updatePost(title, topic, content, postId);
				alert("Post updated");
				return (window.location = "./post.html?id=" + postId);
			}
		}
        alert("Each field has to be between " + MIN_LENGTH + " to " + MAX_LENGTH + " characters long.");
	});
};

configureButtons();
loadPost();