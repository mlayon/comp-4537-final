async function apiCall(method, url, data = null) {
    let resp;
    try {
        resp = await ajaxRequest(method, url, data);
    } catch (error) {
        resp = error;
    }

    return resp;
}

async function login(email, password) {
    let data = {
        email: email,
        password: password,
    };

    let resp = await apiCall(METHOD.POST, '/login', data);
    if (resp['status'] === 'success')
        window.localStorage.setItem('jwt', resp['data']);
    return resp;
}

function logout() {
    window.localStorage.removeItem('jwt');
}

async function getEndpointStats() {
    return await apiCall(METHOD.GET, '/stats');
}

// POSTS (As in forum posts)
async function getPost(postId) {
    return await apiCall(METHOD.GET, `/post?id=${postId}`);
}
async function getAllPosts() {
    return await apiCall(METHOD.GET, '/post/all');
}
async function createPost(title, topic, content) {
    return await apiCall(METHOD.POST, '/post', {
        title: title,
        topic: topic,
        content: content,
    });
}
async function updatePost(title, topic, content, post_id) {
    let data = { title: title, topic: topic, content: content, post_id: post_id };
    return await apiCall(METHOD.PUT, '/post', data);
}
async function deletePost(postId) {
    return await apiCall(METHOD.DELETE, `/post?id=${postId}`);
}

// Comments (As in forum comments)
async function getPostComments(postId) {
    return await apiCall(METHOD.GET, `/comment?id=${postId}`);
}
async function createComment(content, postId) {
    return await apiCall(METHOD.POST, '/comment', {
        content: content,
        post_id: postId,
    });
}
async function updateComment(content, comment_id) {
    return await apiCall(METHOD.PUT, '/comment', {
        content: content,
        comment_id: comment_id,
    });
}
async function deleteComment(comment_id) {
    return await apiCall(METHOD.DELETE, `/comment?id=${comment_id}`);
}