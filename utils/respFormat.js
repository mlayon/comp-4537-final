function formatSuccess(messageData) {
    return { status: 'success', data: messageData }
}

function formatError(data) {
    return { status: 'error', data: messageData }
}

module.exports = {
    formatSuccess,
    formatError
}