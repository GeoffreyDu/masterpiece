import labelErrors from "../config/labelErrors";

const errorType = (error)=>{
    const status = error.status;
    console.log(status)
    let messageContainer = [];
    if (status === 400) {
        error.data.forEach(msg => {
            messageContainer.push( `${msg.attribute} : ${labelErrors[msg.code]}`)  
        });
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
    console.log(messageContainer)
    return messageContainer;
}

export default errorType