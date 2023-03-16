"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
module.exports = ApiError;
