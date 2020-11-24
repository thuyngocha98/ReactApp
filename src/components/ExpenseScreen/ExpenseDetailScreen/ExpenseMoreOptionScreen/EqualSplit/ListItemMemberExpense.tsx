import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import ListitemMemberExpenseStyles from '../../../../../styles/ExpenseScreenStyles/ExpenseDetailScreenStyles/ExpenseMoreOptionScreenStyles/EqualSplit/ListItemMemberExpenseStyles';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../../../constants/Colors';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    uriAvatar?: string,
    nameMember?: string,
}

class ListItemMemberExpense extends PureComponent<Props> {
    render() {
        return (
            <View style={ListitemMemberExpenseStyles.flatlistMember}>
                <View style={ListitemMemberExpenseStyles.listMember}>
                    <View style={ListitemMemberExpenseStyles.imageAvatar}>
                        <Image
                            style={ListitemMemberExpenseStyles.avatar}
                            source={{ uri: this.props.uriAvatar }}
                        />
                    </View>
                    <View style={ListitemMemberExpenseStyles.content}>
                        <Text style={ListitemMemberExpenseStyles.txt2}>
                            {this.props.nameMember}
                        </Text>
                    </View>
                    <View style={ListitemMemberExpenseStyles.iconRight}>
                        <Ionicons name='ios-checkmark-circle' size={35} color={Colors.mediumseagreen} />
                    </View>
                </View>
                <View style={ListitemMemberExpenseStyles.underLineInput} />
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ListItemMemberExpense);