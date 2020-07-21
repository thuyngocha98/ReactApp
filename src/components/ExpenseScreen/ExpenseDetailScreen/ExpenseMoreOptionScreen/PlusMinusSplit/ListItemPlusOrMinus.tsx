import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../../../constants/Colors';
import { TextInput } from 'react-native-gesture-handler';
import ListItemPlusOrMinusStyles from '../../../../../styles/ExpenseScreenStyles/ExpenseDetailScreenStyles/ExpenseMoreOptionScreenStyles/PlusOrMinusSplit/ListItemPlusOrMinusStyles';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    uriAvatar?: string,
    nameMember?: string,
}

class ListItemPlusOrMinus extends Component<Props> {
    render() {
        return (
            <View style={ListItemPlusOrMinusStyles.flatlistMember}>
                <View style={ListItemPlusOrMinusStyles.listMember}>
                    <View style={ListItemPlusOrMinusStyles.imageAvatar}>
                        <Image
                            style={ListItemPlusOrMinusStyles.avatar}
                            source={{ uri: this.props.uriAvatar }}
                        />
                    </View>
                    <View style={ListItemPlusOrMinusStyles.content}>
                        <Text style={ListItemPlusOrMinusStyles.txt2}>
                            {this.props.nameMember}
                        </Text>
                        <Text style={ListItemPlusOrMinusStyles.txtMoney}>
                            100,00 US$
                        </Text>
                    </View>
                    <View style={ListItemPlusOrMinusStyles.viewInputMoney}>
                        <View style={ListItemPlusOrMinusStyles.viewUnitMoney}>
                            <Text style={ListItemPlusOrMinusStyles.unitMoney}>
                                +
                        </Text>
                        </View>
                        <View style={ListItemPlusOrMinusStyles.viewInput}>
                            <TextInput
                                style={ListItemPlusOrMinusStyles.inputMoney}
                                placeholder="0.00"
                                keyboardType='number-pad'
                                underlineColorAndroid={"transparent"}
                            />
                        </View>
                    </View>
                </View>
                <View style={ListItemPlusOrMinusStyles.underLineInput} />
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ListItemPlusOrMinus);