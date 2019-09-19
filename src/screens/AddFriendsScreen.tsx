import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import styles from "../styles/AddFriendsScreenStyle";
import {EvilIcons, MaterialCommunityIcons} from "@expo/vector-icons";

class AddFriendsScreen extends Component {
  static navigationOptions = {
    header:null
  };


  addContact = () => {
        this.props.navigation.navigate('AddContactScreen');
  };
    render() {
        return (
            <View>
                <View style={{ backgroundColor: Colors.tabIconSelected}}>
                    <View style={styles.header}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={styles.cancel}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.addFriends}>Add Friends</Text>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={styles.next}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.input}>
                        <EvilIcons name ='search' size={25} style={{marginRight:5, marginTop:3}}/>
                        <TextInput
                        placeholder={'Enter name, email or phone #'}
                        />
                    </View>
                </View>
                <View >
                    <TouchableOpacity style={{flexDirection: 'row', marginLeft:20, marginTop: 10, alignItems:'center'}} onPress={this.addContact}>
                        <MaterialCommunityIcons name={'account-plus'} size={35} style={{opacity: 0.8}}/>
                        <Text style={{fontSize: 17, marginLeft:10, opacity:0.7}}>Add a new contact to SplitWise</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default AddFriendsScreen;
