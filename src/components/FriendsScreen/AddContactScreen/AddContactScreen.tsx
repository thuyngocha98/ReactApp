import React, {Component} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from "react-native";
import Colors from "../../../constants/Colors";
import styles from '../../../styles/FriendsScreenStyles/AddContactScreenStyle/AddContactScreenStyle';
import Dialog, {FadeAnimation,DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import Layout from "../../../constants/Layout";

type MyProps = { navigation, Modal };
type MyState = { isModalVisible };

class AddContactScreen extends Component<MyProps, MyState> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state ={
            isModalVisible:false
        }
    }

    showModal = () => {
      this.setState({
          isModalVisible: !this.state.isModalVisible

      });

    };

    cancel = () => {
      this.setState({
          isModalVisible: false
      })
    };

    continue = () => {
        this.setState({
            isModalVisible: false
        });
       this.props.navigation.goBack();
    };

    render() {

        return (
            <View>
                <View style={{backgroundColor: Colors.tabIconSelected}}>
                    <View style={styles.header}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.showModal}>
                            <Text style={styles.cancel}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.addContact}>Add new Contact</Text>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={styles.add}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{padding: 15, marginLeft: 10}}>
                    <Text style={{opacity: 0.7}}>NAME</Text>
                    <TextInput
                        style={styles.inputFocused}
                        placeholder={'Please enter your name...'}
                    />
                    <Text style={{marginTop: 10, opacity: 0.8}}>PHONE NUMBER OR EMAIL EXPRESS</Text>
                    <TextInput
                        style={styles.inputFocused}
                        placeholder={'Please enter your phone number...'}
                    />
                </View>
                <View style={{paddingHorizontal: 40}}>
                    <Text style={{opacity: 0.7, textAlign: 'center',}}>Don't worry, nothing sends just yet. You will
                        have another chance to
                        review before sending.</Text>
                </View>
                <View >
                    <Dialog
                        FadeAnimation={new FadeAnimation({
                            initialValue: 0, // optional
                            // animationDuration: 150, // optional
                            useNativeDriver: true, // optional
                        })}
                        width={Layout.window.width -100}
                        visible={this.state.isModalVisible}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="Continue"
                                    onPress={this.continue}
                                />
                                <DialogButton
                                    text="Cancel"
                                    onPress={this.cancel}
                                    textStyle={{color:'red'}}
                                />
                            </DialogFooter>
                        }
                    >
                        <DialogContent>
                            <View style={{marginTop:15}}>
                                <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20, marginBottom:5}}>Cancel adding new contact?</Text>
                                <Text style={{textAlign:'center'}}>If you Continue, this person will not be added to your group.</Text>
                            </View>
                        </DialogContent>
                    </Dialog>
                </View>
            </View>
        );
    }
}




export default AddContactScreen;
