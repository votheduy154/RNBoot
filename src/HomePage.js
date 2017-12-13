import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
        <Button color="red" title="TEST CODE PUSH" onPress={() => this.testCodePush()} />
        <Button title="Learn More" color="#841584" onPress={() => this.XinChao()} />
      </View>
    );
  }
  componentDidMount() {
    console.log('asdasdas');
  }
}

export default HomeScreen;
