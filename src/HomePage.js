import React from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import AccountKit, { LoginButton, Color, StatusBarStyle } from 'react-native-facebook-account-kit';
import CodePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
// import Svg, { Circle, Rect } from 'react-native-svg';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    height: 50,
    width: 300,
    backgroundColor: 'green',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  linearGradient: {
    height: 100,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fbData: '',
      authToken: null,
      loggedAccount: null,
      restartAllowed: true,
    };
  }
  componentWillMount() {
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.IMMEDIATE,
    });
    this.configureAccountKit();
    AccountKit.getCurrentAccessToken()
      .then((token) => {
        if (token) {
          AccountKit.getCurrentAccount().then((account) => {
            this.setState({
              authToken: token,
              loggedAccount: account,
            });
          });
        } else {
          console.log('No user account logged');
        }
      })
      .catch(e => console.log('Failed to get current access token', e));
  }
  testCodePush = () => {
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.IMMEDIATE,
    });
  };

  configureAccountKit = () => {
    AccountKit.configure({
      theme: {
        // backgroundColor: Color.rgba(0, 120, 0, 0.1),
        // buttonBackgroundColor: Color.rgba(0, 153, 0, 1.0),
        // buttonDisabledBackgroundColor: Color.rgba(100, 153, 0, 0.5),
        // buttonBorderColor:     Color.rgba(0,255,0,1),
        // buttonTextColor:       Color.rgba(0,255,0,1),
        // headerBackgroundColor: Color.rgba(0, 153, 0, 1.00),
        // headerTextColor:       Color.rgba(0,255,0,1),
        // headerButtonTextColor: Color.rgba(0,255,0,1),
        // iconColor:             Color.rgba(0,255,0,1),
        // inputBackgroundColor:  Color.rgba(0,255,0,1),
        // inputBorderColor:      Color.hex('#ccc'),
        // inputTextColor:        Color.hex('#0f0'),
        // textColor:             Color.hex('#0f0'),
        // titleColor:            Color.hex('#0f0'),
        // backgroundImage:       "background.png",
        // statusBarStyle:        StatusBarStyle.LightContent,
      },
      // countryWhitelist: [ "AR", "BR", "US" ],
      // countryBlacklist: [ "BR" ],
      // defaultCountry: 'VI',
      initialEmail: 'example.com',
      initialPhoneCountryPrefix: '+84',
      initialPhoneNumber: '',
    });
  };

  onLogin(token) {
    if (!token) {
      console.warn('User canceled login');
      this.setState({});
    } else {
      AccountKit.getCurrentAccount().then((account) => {
        this.setState({
          authToken: token,
          loggedAccount: account,
        });
      });
    }
  }

  onLoginError = (e) => {
    console.log('Failed to login', e);
  };

  onEmailLoginPressed = () => {
    AccountKit.loginWithEmail()
      .then((token) => {
        this.onLogin(token);
      })
      .catch(e => this.onLoginError(e));
  };

  onLogoutPressed() {
    AccountKit.logout()
      .then(() => {
        this.setState({
          authToken: null,
          loggedAccount: null,
        });
      })
      .catch(e => console.log('Failed to logout'));
  }

  renderUserLogged() {
    const { id, email, phoneNumber } = this.state.loggedAccount;
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={() => this.onLogoutPressed()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Account Kit Id</Text>
        <Text style={styles.text}>{id}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>{email}</Text>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.text}>
          {phoneNumber ? `${phoneNumber.countryCode} ${phoneNumber.number}` : ''}
        </Text>
      </View>
    );
  }

  renderLogin() {
    return (
      <View>
        <LoginButton
          style={styles.button}
          type="phone"
          onLogin={token => this.onLogin(token)}
          onError={e => this.onLogin(e)}
        >
          <Text style={styles.buttonText}>SMS</Text>
        </LoginButton>
        <TouchableOpacity style={styles.button} onPress={() => this.onEmailLoginPressed()}>
          <Text style={styles.buttonText}>Email</Text>
        </TouchableOpacity>
      </View>
    );
  }

  XinChao() {
    this.props.navigator.push({
      screen: 'RNBoot.DemoScreen',
      title: 'Xin chao',
    });
  }

  loginFB = () => {
    LoginManager.logInWithReadPermissions([
      'public_profile',
      'user_birthday',
      'user_friends',
      'email',
      'user_likes',
      'user_photos',
      'user_location',
    ]).then(
      (result) => {
        if (result.isCancelled === true) {
          // console.log(isCancelled)
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            if (data) {
              const { accessToken } = data;
              const responseInfoCallback = (error, dataFB) => {
                // console.log(dataFB);
                this.setState({
                  fbData: `${dataFB.name} - ${dataFB.birthday} - ${dataFB.email}`,
                });
              };
              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken,
                  parameters: {
                    fields: {
                      string:
                        'email,name, first_name, middle_name, last_name, birthday, picture.width(150).height(150)',
                    },
                  },
                },
                responseInfoCallback,
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            }
          });
        }
      },
      (error) => {
        // error
        console.log(error);
      },
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20 }}>{this.state.fbData}</Text>
        <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={() => this.loginFB()}>
          Login Facebook
        </Icon.Button>
        <View style={styles.container}>
          {this.state.loggedAccount ? this.renderUserLogged() : this.renderLogin()}
        </View>
        <Text>{DeviceInfo.getUniqueID()}</Text>
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>Sign in with Facebook 123</Text>
        </LinearGradient>
        {/*
        <Svg height="100" width="100">
          <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
          <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" />
        </Svg> */}
        <Text style={{ fontSize: 20 }}>This...</Text>
        <Button color="red" title="TEST CODE PUSH" onPress={() => this.testCodePush()} />
        <Text style={{ fontSize: 20 }}>This...</Text>
        <Button title="Learn More" color="#841584" onPress={() => this.XinChao()} />
      </View>
    );
  }
}

export default CodePush(codePushOptions)(HomeScreen);
