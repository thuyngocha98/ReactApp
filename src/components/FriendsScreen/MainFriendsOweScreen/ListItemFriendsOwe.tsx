import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Image, Text} from 'react-native';
import Styles from "../../../styles/FriendsScreenStyles/MainFriendsOweScreenStyle/ListItemFriendsOweStyle";
import Colors from '../../../constants/Colors';
import { Octicons } from '@expo/vector-icons';
import ListDetailFriendsOwe from "./ListDetailFriendsOwe";
// @ts-ignore
import userFriend from "../../../../assets/images/userFriend.png";

type Props = {
    nameFriend?: string,
    detail?: string,
    money?: string,
    data?: any[]
}

class ListItemFriendsOwe extends Component<Props> {

    render() {
        return (
            <View style={Styles.mainContainer}>
                <View style={Styles.cartContainer}>
                    <Image style={Styles.avatar} source={userFriend}/>
                    <View style={Styles.texts}>
                        <View style={Styles.nameFriend}>
                            <Text style={Styles.name}>{this.props.nameFriend}</Text>

                        </View>
                        <View style={Styles.textDetail}>
                            <Text style={Styles.color}>{this.props.detail}</Text>
                            <Text style={Styles.color}>{this.props.money}</Text>
                        </View>
                    </View>
                    <Octicons name='chevron-right' size={25} color={Colors.lightgray} />
                </View>
                <View>
                    <FlatList
                        data={this.props.data}
                        renderItem={({item}) => (
                            <ListDetailFriendsOwe
                                description={item.description}
                                money={item.money}
                                type={item.type}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        );
    }
}

export default ListItemFriendsOwe;
