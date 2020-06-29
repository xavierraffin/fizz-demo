# Client Developer Documentation
## How to create a custom message lambda trigger for Cognitio
1. You need to setup your Ampilify Authentication by running the command `amplify add auth` in the terminal.
    If you already have the authentication api setup you need to remove it and start over, please run the command `amplify auth remove` in the terminal.
    In order to make this trigger succssful we need to make sure that we enable all 3 user attributes and a custom attribute, which can only be set at the time of initial creation. 

1. Once the authentication api setup menu has appeared please follow the selection guide below:

        Using service: Cognito, provided by: awscloudformation
        
        The current configured provider is Amazon Cognito. 
        
        Do you want to use the default authentication and security configuration? Manual configuration
        Select the authentication/authorization services that you want to use: User Sign-Up & Sign-In only (Best used with a cloud API only)
        Please provide a friendly name for your resource that will be used to label this category in the project: fizzdemo
        Please provide a name for your user pool: fizzuserpool
        Warning: you will not be able to edit these selections. 
        How do you want users to be able to sign in? Email or Phone Number
        Do you want to add User Pool Groups? No
        Do you want to add an admin queries API? No
        Multifactor authentication (MFA) user login options: OPTIONAL (Individual users can use MFA)
        For user login, select the MFA types: SMS Text Message
        Please specify an SMS authentication message: Your authentication code is {####}
        Email based user registration/forgot password: Enabled (Requires per-user email entry at registration)
        Please specify an email verification subject: Your verification code
        Please specify an email verification message: Your verification code is {####}
        Do you want to override the default password policy for this User Pool? No
        Warning: you will not be able to edit these selections. 
        What attributes are required for signing up? Email, Locale (This attribute is not supported by Facebook, Google.), Phone Number 
        (This attribute is not supported by Facebook, Login With Amazon.)
        Specify the app's refresh token expiration period (in days): 30
        Do you want to specify the user attributes this app can read and write? No
        Do you want to enable any of the following capabilities? 
        Do you want to use an OAuth flow? No
        ? Do you want to configure Lambda Triggers for Cognito? Yes
        ? Which triggers do you want to enable for Cognito Custom Message
        ? What functionality do you want to use for Custom Message Create your own module
        Successfully added the Lambda function locally
        ? Do you want to edit your custom function now? Yes
        Please edit the file in your editor: /Users/kevnvo/Documents/Amp_Broker/fizz-demo/amplify/backend/function/fizzdemoCustomMessage/src/custom.js
        ? Press enter to continue 

1. Once the your text editor has appeared please copy and paste this code into the lamada function:

            exports.handler = (event, context, callback) => {
            console.log(event);
            // Identify why was this function invoked
            if (event.triggerSource === "CustomMessage_SignUp") {
                let lang = event.request.userAttributes["custom:lang"] // Acesss the event data of custom user Attribute lang
                console.log("Lang is " + lang);


                // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
                // French
                if (lang == "fr") {
                    event.response.smsMessage = "Bienvenue à Fizz. Votre code de confirmation est " + event.request.codeParameter;
                    event.response.emailSubject = "Bienvenue à Fizz";
                    event.response.emailMessage = "Merci pour votre inscription. " + event.request.codeParameter + " est votre code de vérification";
                } 
                //Spanish
                else if (lang == "es"){
                    event.response.smsMessage = "Bienvenido a Fizz Su código de confirmación es " + event.request.codeParameter;
                    event.response.emailSubject = "Bienvenido a Fizz";
                    event.response.emailMessage = "Gracias por registrarte. " + event.request.codeParameter + " es tu código de verificación";
                }
                //German
                else if (lang == "de"){
                    event.response.smsMessage = "Willkommen bei Fizz. Ihr Bestätigungscode lautet " + event.request.codeParameter;
                    event.response.emailSubject = "Willkommen bei Fizz";
                    event.response.emailMessage = "Danke fürs Anmelden. " + event.request.codeParameter + " ist Ihr Bestätigungscode";
                }
                //Vietnamese
                else if (lang == "vn"){
                    event.response.smsMessage = "Chào mừng đến với Fizz. Mã xác nhận của bạn là " + event.request.codeParameter;
                    event.response.emailSubject = "Chào mừng đến với Fizz";
                    event.response.emailMessage = "Cảm ơn bạn đã đăng ký. " + event.request.codeParameter + " là mã xác minh của bạn";
                }
                //English
                else {
                    event.response.smsMessage = "Welcome to Fizz. Your confirmation code is " + event.request.codeParameter;
                    event.response.emailSubject = "Welcome to Fizz";
                    event.response.emailMessage = "Thank you for signing up. " + event.request.codeParameter + " is your verification code";
                }
            }
            // Create custom message for other events

        // Return to Amazon Cognito
        callback(null, event);
        };

        You can add or remove languages as many languages as you want by add and removing else if conditions.
        Now save the code and press enter on the terminal to finish the process.

1. Now enter `amplify push` to create your resources on the cloud, this step may take a bit of time.

1. Once the resource have been created, please open your AWS console and sign in with the associated account.
   Go to the Cognitio`s service page and click Manage User Pools 
   Now click on the user pool we have just created from the name we gave it in ther pervious steps.
   Under General settings click on Attributes in the left menu bar.


1. Scroll all the way to the bottom and click add custom attribute.
   Enter `lang` under the Name and keep the other fields default, then click save changes.

1. We now need to connect your frontend with your backend now by passing the lambda the lang attrubite data.
   Please open the file App.js that runs your react frontend. To get to this file it is localed in the rootproject/src/App.js .


1. We only need to add lang as a custom attribute in the form field:

         <AmplifySignUp 
            // Issue with auto populate and hidden: https://github.com/aws-amplify/amplify-js/issues/6168
            usernameAlias="email"
            headerText={I18n.get("signUpHeader")}
            slot="sign-up"
            signInText={I18n.get("signInText")}
            haveAccountText={I18n.get("haveAccountText")}
            submitButtonText={I18n.get("signUpButtonText")}
            formFields={[
              {
                type: "email",
                label: I18n.get("emailLabel"),
                placeholder: I18n.get("emailPlaceHolder"),
                required: true,
              },
              {
                type: "password",
                label: I18n.get("passwordLabel"),
                placeholder: I18n.get("passwordPlaceHolder"),
                required: true,
              },
              {
                type: "phone_number",
                label: I18n.get("phoneNumberLabel"),
                placeholder: I18n.get("phoneNumberPlaceHolder"),
                required: false,
              },
              {
                type: "locale",
                label: I18n.get("Locale"),
                placeholder: "Locale-Code",
                //value: navigator.language,
                //Auto populate does not work for some reason there a bug with navigator.language
                //For now we have to type in the string itself and cannot be hidden, Ampilfy team is working on this solution
                required: true,
              },
              {
                type: "custom:lang",
                label: I18n.get("Lang"),
                placeholder: "Lang-Code",
                //value: this.state.lang,
                //Auto populate does not work for some reason there a bug with navigator.language
                //For now we have to type in the string itself and cannot be hidden, Ampilfy team is working on this solution
                required: true,
              },
            ]}></AmplifySignUp>

1. Now click save and start your React app and it should have worked. You have successful add internationalization to your verification email base on the language selected by the toggle button.

## How to create a login button/link and redirect from authenticated page when no JWT token provided
## How to create a logout link
## How to create a signup link
## How to verify a JWT token
## How to refresh token
## How to get IAM credentials
## Choose your flow (Implicit, PKCE)
## Migration instructions
## If you use Amplify

