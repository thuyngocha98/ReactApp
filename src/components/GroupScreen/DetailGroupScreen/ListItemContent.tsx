import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import ListItemContentStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/ListItemContentStyles';
import { FontAwesome5, Octicons, FontAwesome } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { number2money } from '../../../constants/FunctionCommon';

function mapStateToProps(state) {
    return {
        userID: state.dataUser.dataUser._id
    };
}

type Props = {
    userID: any,
    title?: string,
    detail?: string,
    titleMoney?: string,
    money?: string,
    data?: any,
}

class ListItemContent extends Component<Props> {

    caculateMoney(){
        const arrayUser = this.props.data.list_user;
        let money = 0;
        for(let i = 0; i< arrayUser.length; i++){
            if(arrayUser[i].user_id === this.props.userID){
                if(arrayUser[i].type > 0){
                    money = arrayUser[i].type - arrayUser[i].amount_user;
                }else{
                    money = arrayUser[i].type * arrayUser[i].amount_user;
                }
            }
        }
        return money;
    }

    render() {
        var time = this.props.data.create_date.split(/[\s-T]+/);
        var name = this.props.data.namePayer.split(/[\s ]+/)
        return (
            <View style={ListItemContentStyles.mainContainer}>
                <View style={ListItemContentStyles.container}>
                    <View style={ListItemContentStyles.time}>
                        <Text style={ListItemContentStyles.month}>
                            thg {time[1]}
                        </Text>
                        <Text style={ListItemContentStyles.day}>
                            {time[2]}
                        </Text>
                    </View>
                    <View style={ListItemContentStyles.iconTitle}>
                        <FontAwesome name='file-text-o' size={25} color={Colors.lightgray} />
                    </View>
                    <View style={ListItemContentStyles.content}>
                        <Text style={ListItemContentStyles.title}>{this.props.data.name}</Text>
                        <Text style={ListItemContentStyles.detail} numberOfLines={1}>
                            {name[name.length - 1]} {this.props.data.namePayer[0]}. paid {number2money(this.props.data.moneyPayer)} VND
                    </Text>
                    </View>
                    <View style={ListItemContentStyles.totalMoney}>
                        <Text style={[ListItemContentStyles.titleMoney, { color: this.caculateMoney() > 0 ? Colors.mediumseagreen : Colors.orangered}]}>
                            {this.caculateMoney() > 0 ? "you lent" : "you borrowed"}
                        </Text>
                        <Text style={[ListItemContentStyles.money, { color: this.caculateMoney() > 0 ? Colors.mediumseagreen : Colors.orangered }]}>
                            {this.caculateMoney() > 0 ? number2money(this.caculateMoney()) : number2money(this.caculateMoney()*(-1))} VND
                        </Text>
                    </View>
                    <View style={ListItemContentStyles.iconDetail}>
                        <Octicons name='chevron-right' size={25} color={Colors.lightgray} />
                    </View>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: Colors.lightgray }} />
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ListItemContent);
