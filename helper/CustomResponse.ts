const Response = (res: any, statusCode: number, typeOfResponse: string, data: any) => {
    let success: boolean, errors: string[], message: string;

    if (data) {
        success = true;
        errors = [];
        message = "Success";
    } else {
        success = false;
        errors = ["No Data Provided"];
        message = "Invalid response";
        data = null;
    }

    if(typeOfResponse === "send"){
        return res.status(statusCode).send({ success, errors, message, data });
    }else if(typeOfResponse === "json"){
        return res.status(statusCode).json({ success, errors, message, data });
    }else{
        return res.json({ success, errors, message, data });
    }
};

export default Response;