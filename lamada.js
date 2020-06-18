exports.handler = (event, context, callback) => {
    if (event.userPoolId === "us-west-2_IKA4n5liU") {
        // Identify why was this function invoked
        if (event.triggerSource === "CustomMessage_SignUp") {
            let lang = event.request.userAttributes["custom:lang"]
            console.log("Lang is " + lang);


            // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent

            if (lang == "FR") {
                event.response.smsMessage = "Bienvenue à Fizz. Votre code de confirmation est " + event.request.codeParameter;
                event.response.emailSubject = "Bienvenue à Fizz";
                event.response.emailMessage = "Merci pour votre inscription. " + event.request.codeParameter + " est votre code de vérification";
            } else {
                event.response.smsMessage = "Welcome to Fizz. Your confirmation code is " + event.request.codeParameter;
                event.response.emailSubject = "Welcome to Fizz";
                event.response.emailMessage = "Thank you for signing up. " + event.request.codeParameter + " is your verification code";
            }
        }
        // Create custom message for other events
    }
    // Customize messages for other user pools

    // Return to Amazon Cognito
    callback(null, event);
};