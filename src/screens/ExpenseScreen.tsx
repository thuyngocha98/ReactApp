import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputExpenseScreen from '../components/ExpenseScreen/InputExpenseScreen/InputExpenseScreen';
import GroupScreen from './GroupScreen';
import MainExpenseScreen from '../components/ExpenseScreen/MainExpenseScreen/MainExpenseScreen';
import { View } from 'react-native';

function mapStateToProps(state) {
    return {
    };
}

type Props = {
    navigation?: any,
}

class ExpenseScreen extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };
    _navListener: any;

    render() {
        return (
            <MainExpenseScreen navigation={this.props.navigation} />
        );
    }
}

export default connect(
    mapStateToProps)(ExpenseScreen);


