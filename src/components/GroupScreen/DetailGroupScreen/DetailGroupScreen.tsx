import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Animated, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';
import DetailGroupScreenStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/DetailGroupScreenStyles';
import { Icon } from 'expo';

function mapStateToProps(state) {
    return {

    };
}


class DetailGroupScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Create a group',
            headerStyle: {
                elevation: 0,
                textAlign: 'center',
                backgroundColor: Colors.tintColor,
            },
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                color: Colors.white
            },
            headerRight:
                (
                    <View style={DetailGroupScreenStyles.headerRight}>
                        <TouchableOpacity
                            onPress={() => {

                            }}
                        >
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </View>
                ),
        };
    };

    testt = "Lorem Ipsum is simply dummy text of the printing and typesetting in"


    render() {

        return (
            <View>
                <Text>aaaaa</Text>
            </View>
        );
    }
}

export default connect(mapStateToProps,)(DetailGroupScreen);
