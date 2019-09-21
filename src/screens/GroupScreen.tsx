import React, {Component} from 'react';
import { ScrollView, StyleSheet, View, Text} from 'react-native';
import Products from '../components/Products'
import MainScreenGroup from '../components/GroupScreen/MainScreenGroup/MainScreenGroup';


class GroupScreen extends Component {
    render() {
        return (
            <MainScreenGroup />
        );
    }
}

export default GroupScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
