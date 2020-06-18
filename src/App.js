import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp, AmplifyButton, AmplifySelectMfaType, AmplifyForgotPassword } from '@aws-amplify/ui-react';
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
    } else {
      I18n.setLanguage("en");
      this.setState({ lang: "en" });
    }
  }

  // Issue on translation of subfield is https://github.com/aws-amplify/amplify-js/issues/5679

  render = () => (
    <div>
      <AmplifyButton onClick={this.toggleLang}>langue {this.state.lang}</AmplifyButton>
      <div style={styles.container}>
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySelectMfaType MFATypes={MFATypeOptions}></AmplifySelectMfaType>
          <AmplifySignIn
            usernameAlias="email"
            headerText={I18n.get("signInHeader")}
            slot="sign-in"
          ></AmplifySignIn>
          <AmplifySignUp
            usernameAlias="email"
            headerText={I18n.get("signUpHeader")}
            slot="sign-up"
          ></AmplifySignUp>
          <AmplifyForgotPassword
            usernameAlias="email"
            headerText={I18n.get("forgotPasswordHeader")}
            slot="forgot-password"
          ></AmplifyForgotPassword>
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
