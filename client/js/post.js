async function loadComments() {
    console.log(window.location);
    let url = (new URL(window.location)).searchParams;
    let postId = url.get('id');

    let post = await getPost(postId);
    let comments = await getPostComments(postId);

    if (post['status'] !== 'success') {
        alert(post['data']);
        return window.location = './login.html'
    }

    renderPost(post['data']);

    for (let comment of comments['data'])
        renderComment(comment);
}

function renderPost(post) {
    console.log("Post", post);

    document.getElementById('title').innerHTML = post.title;
    document.getElementById('topic').innerHTML = post.topic;
    document.getElementById('content').innerHTML = post.content
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


loadComments();