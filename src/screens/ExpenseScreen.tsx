import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainExpenseScreen from '../components/ExpenseScreen/MainExpenseScreen/MainExpenseScreen';

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


