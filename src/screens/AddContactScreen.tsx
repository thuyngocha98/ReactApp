import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";
import styles from '../styles/AddContactScreenStyle';


class AddContactScreen extends Component {
    static navigationOptions = {
        header: null
    };

    comeBackAddFriendsScreen = () => {
      this.props.navigation.navigate('AddFriendsScreen')
    };

    render() {
        return (
            <View>
                <View style={{backgroundColor: Colors.tabIconSelected}}>
                    <View style={styles.header}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.comeBackAddFriendsScreen}>
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
            </View>
        );
    }
}

export default AddContactScreen;
