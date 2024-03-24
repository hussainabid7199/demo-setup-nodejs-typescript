"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = ((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error'
        }
    });
});
exports.default = ErrorHandler;
