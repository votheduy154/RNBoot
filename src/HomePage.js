import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

// import LinearGradient from 'react-native-linear-gradient';
// import Svg, { Circle, Rect } from 'react-native-svg';
// import codePush from 'react-native-code-push';

// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
// };

const styles = StyleSheet.create({
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
    this.state = { fbData: '' };
  }
  // componentWillMount() {
  //   codePush.sync({
  //     updateDialog: true,
  //     installMode: codePush.InstallMode.IMMEDIATE,
  //   });
  // }
  // testCodePush() {
  //   this.codePush.sync({
  //     updateDialog: true,
  //     installMode: codePush.InstallMode.IMMEDIATE,
  //   });
  // }
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
        <Text style={{ fontSize: 30 }}>This is home page.</Text>
        <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
          Login Facebook
        </Icon.Button>
        {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>Sign in with Facebook 123</Text>
        </LinearGradient>
        <Svg height="100" width="100">
          <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
          <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" />
        </Svg> */}
        {/* <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={(error, result) => {
            if (error) {
              alert(`Login failed with error: ${result.error}`);
            } else if (result.isCancelled) {
              alert('Login was cancelled');
            } else {
              alert(`Login was successful with permissions: ${result.grantedPermissions}`);
            }
          }}
          onLogoutFinished={() => alert('User logged out')}
        /> */}
        <Text style={{ fontSize: 30 }}>{this.state.fbData}</Text>
        <Button color="red" title="TEST LOGIN FACEBOOK" onPress={() => this.loginFB()} />
        <Text style={{ fontSize: 30 }}>This...</Text>
        <Button color="red" title="TEST CODE PUSH" onPress={() => this.testCodePush()} />
        <Text style={{ fontSize: 30 }}>This...</Text>
        <Button title="Learn More" color="#841584" onPress={() => this.XinChao()} />
      </View>
    );
  }
}

export default HomeScreen;
