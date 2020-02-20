const errorType = (error)=>{
    let msg;
    if (error.data.status === 400) {
        msg = error.data.errors[0].defaultMessage;
    } 
    else if(error.data.status === 401) {
        msg = "Une authentification est nécessaire pour accéder à la ressource";  
    }
    else if(error.data.status === 404) {
        msg = "Ressource non trouvée";  
    }
    else if(error.data.status === 500) {
        msg = "Erreur interne du serveur";  
    }
    else{
        msg = `Erreur: ${error.data.error}`;   
    }
    return msg
}

export default errorType