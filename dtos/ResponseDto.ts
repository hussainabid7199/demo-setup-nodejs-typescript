

export default interface ResponseDto<T> {
    statusCode: Number;
    message: String;
    errors: String;
    data?: T;
}