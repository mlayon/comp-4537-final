function formatSuccess(messageData) {
    return { status: 'success', data: messageData ? messageData : null }
}

function formatError(messageData) {
    return { status: 'error', data: messageData ? messageData : null }
}

module.exports = {
    formatSuccess,
    formatError
}