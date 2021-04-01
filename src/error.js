module.exports = class ServiceError extends Error {
    constructor(statusCode, messageError) {
        super();
        this.statusCode = statusCode
        this.message = messageError
    }
}
