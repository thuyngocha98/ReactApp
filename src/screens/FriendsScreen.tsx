import React, {Component} from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from "../styles/FriendStyles/FriendsScreenStyle";
import {EvilIcons} from "@expo/vector-icons";

class FriendsScreen extends Component {
    static  navigationOptions = ({navigation}) => {
      return {
          headerStyle: {
              elevation: 0
          },
          headerLeft: (
              <TouchableOpacity onPress={() => navigation.navigate('SplitWiseProScreen')}>
                  <EvilIcons name='search' size={30} style={{marginLeft: 10}} />
              </TouchableOpacity>
          ),
          headerRight: (
              <View>
                  <TouchableOpacity activeOpacity={0.5} style={{marginRight: 20}} onPress={() => navigation.navigate('AddFriendsScreen')}>
                      <Text style={{fontSize: 20}}>
                          Add Friends
                      </Text>
                  </TouchableOpacity>
              </View>
          )
      }
    };

    render() {
        return (
            <View>
                <Text style={styles.friends}>
                    Friends
                </Text>
               <ScrollView>
                   <View style={styles.cartExpense}>
                       <Text style={{color: '#fff'}}>

                       </Text>
                   </View>
               </ScrollView>
            </View>
        );
    }
}


export default FriendsScreen;
