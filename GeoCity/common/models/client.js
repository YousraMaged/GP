'use strict';

module.exports = function (Client) {

    Client.log = function (messageId, options) {
        const Message = this.app.models.Message;
        return Message.findById(messageId, null, options).
            then(msg => {
                const token = options && options.accessToken;
                const userId = token && token.userId;
                const user = userId ? 'user#' + userId : '<anonymous>';
                console.log('(%s) %s', user, msg.text);
    })
}
};
