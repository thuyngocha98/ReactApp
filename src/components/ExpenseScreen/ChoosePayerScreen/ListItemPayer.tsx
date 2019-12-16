import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text  } from 'react-native';
import ListItemPayerStyles from '../../../styles/ExpenseScreenStyles/ChoosePayerScreenStyles/ListItemPayerStyles';
import Colors from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { thumbnails } from '../../../constants/FunctionCommon';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    name?: string,
    isCheck?: boolean,
    avatar?: any,
}

class ListItemPayer extends Component<Props> {
    render() {
        const thumbnail = this.props.avatar.length > 2 ? { uri: `data:image/png;base64,${this.props.avatar}` } : thumbnails["avatar" + this.props.avatar]
        return (
            <View style={ListItemPayerStyles.mainContainer}>
                <View style={ListItemPayerStyles.container}>
                    <View style={ListItemPayerStyles.avatar}>
                        <Image
                            style={ListItemPayerStyles.image}
                            source={thumbnail}
                        />
                    </View>
                    <View style={ListItemPayerStyles.name}>
                        <Text style={[ListItemPayerStyles.txt,{fontWeight: this.props.isCheck ? '500': '400'}]}>{this.props.name}</Text>
                    </View>
                    <View style={[ListItemPayerStyles.iconCheck, {opacity: this.props.isCheck ? 1 : 0}]}>
                        <Ionicons name="ios-checkmark" size={40} color={Colors.mediumseagreen} />
                    </View>

                </View>
                <View style={ListItemPayerStyles.underLine} />
            </View>
            
        );
    }
}

export default connect(
    mapStateToProps,
)(ListItemPayer);