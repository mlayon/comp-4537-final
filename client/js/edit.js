const url = new URL(window.location).searchParams;
const postId = url.get("id");
const emptyPost = {
	title: "",
	topic: "",
	content: "",
};

async function loadPost() {
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
}

function renderPost(post) {
	console.log("Post", post);

	document.getElementById("title").innerHTML = post.title;
	document.getElementById("topic").innerHTML = post.topic;
	document.getElementById("content").innerHTML = post.content;
}

function configureButtons() {

	// Save button for edit.html
	$("#saveButton").click(function () {
		let title = document.getElementById("title").value;
		let topic = document.getElementById("topic").value;
		let content = document.getElementById("content").value;
        console.log("postid: ", postId);

		if (postId === "new") {
			createPost(title, topic, content);
			alert("Post created");
            return (window.location = "./index.html");

		} else {
			updatePost(title, topic, content, postId);
			alert("Post updated");
			return (window.location = "./post.html?id=" + postId);
		}
    });

}

configureButtons();
loadPost();
