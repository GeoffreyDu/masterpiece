import labelErrors from "../config/labelErrors";

// With error status set error message
const errorType = (error)=>{
    const status = error.status;
    let messageContainer = [];
    console.log(error)
    console.log(error.status)
    if (status === 400) {
        if (Array.isArray(error.data)){
            error.data.forEach(msg => {
                messageContainer.push(labelErrors[msg.code])  
            });
        }
        else{
            messageContainer.push(error.data.error_description);
        }
    } 
    else if(status === 401) {
        messageContainer.push(labelErrors.Unauthorize)  
    }
    else if(status === 404) {
        messageContainer.push(labelErrors.NotFound) 
    }
    else if(status === 500) {
        messageContainer.push(labelErrors.ServerError)  
    }
    else{
        messageContainer.push(labelErrors.General)   
    }
    return messageContainer;
}

export default errorType