// import React, {Component} from 'react';
// import styles from "../../styles/LoginScreenStyle/FormStyle";
// import {
//     View,
//     TextInput,
//     Image, TouchableOpacity
// } from "react-native";
// // @ts-ignore
// import username from "../../../assets/images/username.png";
// // @ts-ignore
// import reactLogo from "../../../assets/images/Reactlogo.png";
// // @ts-ignore
// import password from "../../../assets/images/password.png";
// // @ts-ignore
// import eyeBlack from "../../../assets/images/eye_black.png";
//
// class Form extends Component {
//     state = {
//         showPass: true
//     };
//
//     showPass = () => {
//         this.setState({
//             showPass: !this.state.showPass
//         })
//     };
//     render() {
//         return (
//          <View>
//              <View style={styles.loginContainer}>
//                  <View style={styles.login}>
//                      <Image source={username} style={styles.userName}/>
//                      <TextInput
//                          style={styles.input}
//                          placeholder={'username'}
//                          autoCapitalize={'none'}
//                          returnKeyType={'done'}
//                          autoCorrect={false}
//                          placeholderTextColor="black"
//                          underlineColorAndroid="transparent"
//                      />
//                  </View>
//              </View>
//              <View style={styles.loginContainer}>
//                  <View style={styles.login}>
//                      <Image source={password} style={styles.userName}/>
//                      <TextInput
//                          style={styles.input1}
//                          placeholder={'password'}
//                          secureTextEntry={this.state.showPass}
//                          autoCapitalize={'none'}
//                          returnKeyType={'done'}
//                          autoCorrect={false}
//                          placeholderTextColor="black"
//                          underlineColorAndroid="transparent"
//                      />
//                      <TouchableOpacity activeOpacity={0.5} onPress={this.showPass}>
//                          <Image
//                              source={eyeBlack}
//                              style={styles.eyeBlack}
//                          />
//                      </TouchableOpacity>
//                  </View>
//              </View>
//          </View>
//         );
//     }
// }
//
//
//
// export default Form;
