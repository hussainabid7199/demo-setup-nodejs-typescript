"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response = (res, statusCode, typeOfResponse, data) => {
    let success, errors, message;
    if (data) {
        success = true;
        errors = [];
        message = "Success";
    }
    else {
        success = false;
        errors = ["No Data Provided"];
        message = "Invalid response";
        data = null;
    }
    if (typeOfResponse === "send") {
        return res.status(statusCode).send({ success, errors, message, data });
    }
    else if (typeOfResponse === "json") {
        return res.status(statusCode).json({ success, errors, message, data });
    }
    else {
        return res.json({ success, errors, message, data });
    }
};
exports.default = Response;
