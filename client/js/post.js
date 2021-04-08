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
    let commentId = comment.comment_id;

	// post related elements
	let row = document.createElement("tr");
	let td_content = document.createElement("td");
    let td_edit = document.createElement("td");
    let td_delete = document.createElement("td");

    // creating buttons
    let button_edit = document.createElement("button");
    let button_delete = document.createElement("button");
    button_edit.classList.add("editComment");
    button_delete.classList.add("deleteComment");
    button_edit.id = commentId;
    button_delete.id = commentId;

    let node_edit = document.createTextNode("Edit Comment");
    let node_delete = document.createTextNode("Delete Comment");

    button_edit.appendChild(node_edit);
    button_delete.appendChild(node_delete);

    td_edit.appendChild(button_edit);
    td_delete.appendChild(button_delete);

    let textarea = document.createElement("textarea");
    textarea.classList.add("comments");
    textarea.id = "comment" + commentId;
    textarea.innerHTML = comment.content;
    textarea.readOnly = true;

    td_content.appendChild(textarea);
	row.id = commentId;

	// appending elements
    row.appendChild(td_content);
    row.appendChild(td_edit);
    row.appendChild(td_delete);

	document.getElementById("comments-table").appendChild(row);
}

function configurePostButtons() {
	$("#editButton").click(function () {
		window.location = "./edit.html?id=" + postId;
	});

	$("#deleteButton").click(function () {
		console.log("postid: ", postId);
		deletePost(postId);
		alert("Post deleted");
		return (window.location = "./index.html");
	});
    
    // Save button for edit.html
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

function configureCommentButtons() {
    let readOnly = true; // for toggling readonly on each comment's textarea 
    $("#addComment").click(function () {
		let comment = document.getElementById("comment").value;
        if (comment) {
            createComment(comment, postId);
		    alert("Comment added");
        }
        return (window.location = "./post.html?id=" + postId);
	});

    $(document).on('click', '.editComment', function() {
        let commentId = this.id;

        // if comment textarea is already editable, it's ready to be updated in db
        if (readOnly === false) {
            let content = $('#comment'+commentId).val();
            updateComment(content, commentId);
		    alert("Comment updated");
		    return (window.location = "./post.html?id=" + postId);
        }
        readOnly = !readOnly
        $('#comment'+commentId).attr('readonly', readOnly);
        alert("Comment is now editable");

        console.log(content);
    });

    // for deleting comments
    $(document).on('click', '.deleteComment', function() { 
        let commentId = this.id;
        deleteComment(commentId);
		alert("Comment deleted");
		return (window.location = "./post.html?id=" + postId);
    });
    


}

configurePostButtons();
configureCommentButtons();
loadComments();
