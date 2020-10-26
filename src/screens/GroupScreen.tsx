import React, {Component} from 'react';
import {View, StatusBar, TouchableOpacity, StyleSheet} from 'react-native';
import MainScreenGroup from '../components/GroupScreen/MainScreenGroup/MainScreenGroup';
import {screenWidth} from "../constants/Dimensions";
import Colors from "../constants/Colors";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
    navigation?: any,
}


class GroupScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <MainScreenGroup
                    navigation={this.props.navigation}
                />
                <TouchableOpacity style={styles.addTrip}
                                  activeOpacity={0.5}
                                  onPress={ () => this.props.navigation.navigate('CreateGroupScreen')}
                >
                    <MaterialIcons name={'add'} color={Colors.white} size={screenWidth/10}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    addTrip: {
        position: 'absolute',
        bottom: 15,
        right: 20,
        width: screenWidth / 7.5,
        height: screenWidth / 7.5,
        borderRadius: screenWidth / 4,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: Colors.tintColor
    }
});

export default GroupScreen;
