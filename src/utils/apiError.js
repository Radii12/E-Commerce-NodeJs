//class for handel erro
class ApiError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith('4') ? 'error':'fail';
        this.isOperational=true
    }
}
module.exports=ApiError;