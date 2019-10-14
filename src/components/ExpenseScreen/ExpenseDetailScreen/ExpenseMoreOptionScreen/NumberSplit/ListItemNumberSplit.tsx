import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ListItemNumberSplitStyles from '../../../../../styles/ExpenseScreenStyles/ExpenseDetailScreenStyles/ExpenseMoreOptionScreenStyles/NumberSplit/ListItemNumberSplitStyles';
import Colors from '../../../../../constants/Colors';
import { TextInput } from 'react-native-gesture-handler';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    uriAvatar?: string,
    nameMember?: string,
}

class ListItemNumberSplit extends Component<Props> {
    render() {
        return (
            <View style={ListItemNumberSplitStyles.flatlistMember}>
                <View style={ListItemNumberSplitStyles.listMember}>
                    <View style={ListItemNumberSplitStyles.imageAvatar}>
                        <Image
                            style={ListItemNumberSplitStyles.avatar}
                            source={{ uri: this.props.uriAvatar }}
                        />
                    </View>
                    <View style={ListItemNumberSplitStyles.content}>
                        <Text style={ListItemNumberSplitStyles.txt2}>
                            {this.props.nameMember}
                        </Text>
                    </View>
                    <View style={ListItemNumberSplitStyles.viewInputMoney}>
                        <View style={ListItemNumberSplitStyles.viewUnitMoney}>
                            <Text style={ListItemNumberSplitStyles.unitMoney}>
                                US$
                        </Text>
                        </View>
                        
                        <View style={ListItemNumberSplitStyles.viewInput}>
                            <TextInput
                                style={ListItemNumberSplitStyles.inputMoney}
                                placeholder="0.00"
                                underlineColorAndroid={Colors.gray}
                            />
                        </View>
                    </View>
                </View>
                <View style={ListItemNumberSplitStyles.underLineInput} />
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ListItemNumberSplit);