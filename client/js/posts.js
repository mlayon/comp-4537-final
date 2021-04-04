async function getPosts() {
    let resp = await getAllPosts();

    if (resp['status'] !== 'success')
        return alert(resp['data']);

    for (let post of resp['data'])
        renderPosts(post)
}

// renders dom elements for each post
function renderPosts(obj) {
    console.log("Posts", obj);

    // post related elements
    let row = document.createElement("tr");
    let td_title = document.createElement("td");
    let td_topic = document.createElement("td");
    let td_content = document.createElement("td");
    let td_button = document.createElement("button");

    td_title.id = obj.post_id;
    td_title.innerHTML = obj.title;
    td_topic.innerHTML = obj.topic;
    td_content.innerHTML = obj.content;

    td_button.innerHTML = 'comments';
    td_button.onclick = event => {
        window.location = '/post.html?id=' + obj.post_id;
    }

    // appending elements
    row.appendChild(td_title);
    row.appendChild(td_topic);
    row.appendChild(td_content);
    row.appendChild(td_button);


    document.getElementById("posts-table").appendChild(row);

}

function renderComments(obj) {

}

getPosts();