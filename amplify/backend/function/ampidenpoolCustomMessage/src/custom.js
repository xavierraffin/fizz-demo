var providerName = "Unamed Service";
exports.handler = (event, context, callback) => {
    console.log(event);
    // Identify why was this function invoked
    if (event.triggerSource === "CustomMessage_SignUp") {
        let lang = event.request.userAttributes["custom:lang"] // Acesss the event data of custom user Attribute lang
        console.log("Lang is " + lang);


        // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
        // French
        if (lang == "fr") {
            event.response.smsMessage = "Bienvenue à " + providerName+ ". Votre code de confirmation est " + event.request.codeParameter;
            event.response.emailSubject = "Bienvenue à " + providerName;
            event.response.emailMessage = "Merci pour votre inscription. " + event.request.codeParameter + " est votre code de vérification";
        } 
        //Spanish
        else if (lang == "es"){
            event.response.smsMessage = "Bienvenido a " + providerName + " Su código de confirmación es " + event.request.codeParameter;
            event.response.emailSubject = "Bienvenido a " + providerName;
            event.response.emailMessage = "Gracias por registrarte. " + event.request.codeParameter + " es tu código de verificación";
        }
        //German
        else if (lang == "de"){
            event.response.smsMessage = "Willkommen bei " + providerName + ". Ihr Bestätigungscode lautet " + event.request.codeParameter;
            event.response.emailSubject = "Willkommen bei " + providerName;
            event.response.emailMessage = "Danke fürs Anmelden. " + event.request.codeParameter + " ist Ihr Bestätigungscode";
        }
        //Vietnamese
        else if (lang == "vn"){
            event.response.smsMessage = "Chào mừng đến với " + providerName + ". Mã xác nhận của bạn là " + event.request.codeParameter;
            event.response.emailSubject = "Chào mừng đến với " + providerName;
            event.response.emailMessage = "Cảm ơn bạn đã đăng ký. " + event.request.codeParameter + " là mã xác minh của bạn";
        }
        //English
        else {
            event.response.smsMessage = "Welcome to " + providerName + ". Your confirmation code is " + event.request.codeParameter;
            event.response.emailSubject = "Welcome to " + providerName;
            event.response.emailMessage = "Thank you for signing up. " + event.request.codeParameter + " is your verification code";
        }
    }
    // Create custom message for other events

  // Return to Amazon Cognito
  callback(null, event);
};
