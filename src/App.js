import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp, AmplifyButton, AmplifyForgotPassword, AmplifySelectMfaType } from '@aws-amplify/ui-react';
import { I18n } from '@aws-amplify/core';
import { strings } from './strings';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

I18n.putVocabularies(strings);

const MFATypeOptions = {
  SMS: true,
  TOTP: true,
  Optional: true,
};

// See doc for customization here: https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#slots

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { lang: "en" };
  }
   //old toggle
  /*toggleLang = () => {
    console.log(this);
    if (this.state.lang === "en") {
      I18n.setLanguage("fr");
      this.setState({ lang: "fr" });
    } else {
      I18n.setLanguage("en");
      this.setState({ lang: "en" });
    }
  }*/
// New toggle with more languages 
  toggleLang = () => {
    console.log(this);
    switch(this.state.lang){
      case "en": //English
        I18n.setLanguage("fr");
        this.setState({ lang: "fr" });
        break;
      case "fr":// French
        I18n.setLanguage("es");
        this.setState({ lang: "es" });
        break;
      case "es": //Spanish
        I18n.setLanguage("de");
        this.setState({ lang: "de" });
        break;
      case "de": //German
        I18n.setLanguage("vn");
        this.setState({ lang: "vn" });
        break;
      case "vi": //Vietnamese
        I18n.setLanguage("en");
        this.setState({ lang: "en" });
        break;
      default:
        I18n.setLanguage("en");
        this.setState({ lang: "en" });
        break;
    }
  }

  // Issue on translation of subfield is https://github.com/aws-amplify/amplify-js/issues/5679

  render = () => (
    <div>
      <AmplifyButton onClick={this.toggleLang}>langue {this.state.lang}</AmplifyButton>
      <div style={styles.container}>
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySelectMfaType MFATypes={MFATypeOptions}></AmplifySelectMfaType>
          <AmplifyForgotPassword 
            usernameAlias="email"
            slot="forgot-password"
            headerText= {I18n.get("resetYourPassword")}
            submitButtonText= {I18n.get("sendCode")} //Bug?
            formFields={[
              {
                type: "email",
                label: I18n.get("emailLabel"),
                placeholder: I18n.get("emailPlaceHolder"), //Bug?
                required: true,
              },
            ]}></AmplifyForgotPassword>
          <AmplifySignIn
            usernameAlias="email"
            headerText={I18n.get("signInHeader")}
            //forgotYourPassword={I18n.get("forgotYourPassword")} No Support?
            slot="sign-in"
            submitButtonText={I18n.get("signInButtonText")}
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
              }
            ]}></AmplifySignIn>
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
          <div>
            {/* This is not really private, you should instead use the credential to load something dynamically from the backend */}
              Private Content
            <AmplifySignOut />
          </div>
        </AmplifyAuthenticator>
        </div>
    </div>
  );
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 0 },
}

export default App;
