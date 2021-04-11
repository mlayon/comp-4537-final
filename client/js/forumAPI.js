const apiCall = async(method, url, data = null) => {
    let resp;
    try {
        resp = await ajaxRequest(method, url, data);
    } catch (error) {
        resp = error;
    }

    return resp;
}

const login = async(email, password) => {
    let data = {
        email: email,
        password: password,
    };

    let resp = await apiCall(METHOD.POST, '/login', data);
    if (resp['status'] === 'success')
        window.localStorage.setItem('jwt', resp['data']);
    return resp;
}

const createUser = async(email, password) => {
    let data = {
        email: email,
        password: password,
    };

    let resp = await apiCall(METHOD.POST, '/account', data);
    if (resp['status'] === 'success')
        window.localStorage.setItem('jwt', resp['data']);
    return resp;
}

const logout = () => {
    window.localStorage.removeItem('jwt');
}

const getEndpointStats = async() => {
    return await apiCall(METHOD.GET, '/stats');
}

// POSTS (As in forum posts)
const getPost = async(postId) => {
    return await apiCall(METHOD.GET, `/post?id=${postId}`);
}
const getAllPosts = async() => {
    return await apiCall(METHOD.GET, '/post/all');
}
const createPost = async(title, topic, content) => {
    return await apiCall(METHOD.POST, '/post', {
        title: title,
        topic: topic,
        content: content,
    });
}
const updatePost = async(title, topic, content, post_id) => {
    let data = { title: title, topic: topic, content: content, post_id: post_id };
    return await apiCall(METHOD.PUT, '/post', data);
}
const deletePost = async(postId) => {
    return await apiCall(METHOD.DELETE, `/post?id=${postId}`);
}

// Comments (As in forum comments)
const getPostComments = async(postId) => {
    return await apiCall(METHOD.GET, `/comment?id=${postId}`);
}
const createComment = async(content, postId) => {
    return await apiCall(METHOD.POST, '/comment', {
        content: content,
        post_id: postId,
    });
}
const updateComment = async(content, comment_id) => {
    return await apiCall(METHOD.PUT, '/comment', {
        content: content,
        comment_id: comment_id,
    });
}
const deleteComment = async(comment_id) => {
    return await apiCall(METHOD.DELETE, `/comment?id=${comment_id}`);
}