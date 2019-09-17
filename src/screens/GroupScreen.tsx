import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Products from '../components/Products'


class GroupScreen extends Component {
    static navigationOptions = {
      header: null
    };
    render() {
        return (
            <ScrollView style={styles.container}>
                <Products/>
            </ScrollView>
        );
    }
}

export default GroupScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
