import LocalizedStrings from 'react-localization';

let labelErrors = new LocalizedStrings({
    fr:{
      NotBlank:"ne doit pas être vide",
      NotNull:"ne peut être nul",
      UniqueMail:"Un compte ayant ce mail existe déjà",
      UniqueEvent:"Un événement semblable existe déjà",
      FutureOrPresent:"la date ne pas être dans le passé",
      Size:"La taille est incorrecte",
      ValidPassword:"Le mot de passe doit faire entre 8 et 20 caractères. Et au moins 1: majuscule, minuscule, chiffre, caractère spécial",
      Unauthorize:"Une authentification est nécessaire pour accéder à la ressource",
      NotFound:"Ressource non trouvée",
      ServerError:"Erreur interne du serveur", 
      General:"Une erreur est survenue"
    },
    en:{
      NotBlank:"can't be empty",
      NotNull:"can't be null",
      UniqueMail:"This mail already exists",
      UniqueEvent:"A similar event already exists",
      FutureOrPresent:"Date can't be in the past",
      Size:"Incorrect size",
      ValidPassword:"Password must contain between 8 and 20 characters. At least one: uppercase, lowercase, digit, special character",
      Unauthorize:"Authorization required",
      NotFound:"Not found",
      ServerError:"Internal server error", 
      General:"An error has occurred"
    }
  })

  export default labelErrors;