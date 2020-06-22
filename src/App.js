import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp, AmplifyButton, AmplifySelectMfaType, AmplifyForgotPassword, AmplifyConfirmSignIn } from '@aws-amplify/ui-react';
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

  toggleLang = () => {
    if (this.state.lang === "en") {
      I18n.setLanguage("fr");
      this.setState({ lang: "fr" });
    } else if (this.state.lang === "fr") {
      I18n.setLanguage("es");
      this.setState({ lang: "es" });
    } else if (this.state.lang === "es") {
      I18n.setLanguage("pt");
      this.setState({ lang: "pt" });
    } else if (this.state.lang === "pt") {
      I18n.setLanguage("en");
      this.setState({ lang: "en" });
    }
  }

  // Issue on some translation not applying https://github.com/aws-amplify/amplify-js/issues/6115

  render = () => (
    <div>
      <AmplifyButton onClick={this.toggleLang}>langue {this.state.lang}</AmplifyButton>
      <div style={styles.container}>
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySelectMfaType MFATypes={MFATypeOptions}></AmplifySelectMfaType>
          <AmplifySignIn
            usernameAlias="email"
            slot="sign-in"
            headerText={I18n.get("signInHeader")} // Customize default English text and provide translation using component properties https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#components
            submitButtonText={I18n.get("signInButtonText")}
            formFields={[ // Customize the form fields using the form fields property https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#custom-form-fields
              {
                type: "email",
                label: I18n.get("emailLabel"), // Provide custom english text and translation 
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
            usernameAlias="email"
            slot="sign-up"
            headerText={I18n.get("signUpHeader")}
          ></AmplifySignUp>
          <AmplifyForgotPassword
            usernameAlias="email"
            slot="forgot-password"
            headerText={I18n.get("resetPasswordHeader")} // Currently need at least one defined property for any translation to work. Probably requires a Github Issue but waiting to see result of 6115
          ></AmplifyForgotPassword>
          <AmplifyConfirmSignIn
            usernameAlias="email"
            slot="confirm-sign-up"
            headerText={I18n.get("confirmSignUpHeader")}
          ></AmplifyConfirmSignIn>
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
