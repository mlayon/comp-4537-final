function formatSuccess(messageData) {
    return { success: true, data: messageData ? messageData : null }
}

function formatError(messageData) {
    return { success: false, data: messageData ? messageData : null }
}

module.exports = {
    formatSuccess,
    formatError
}