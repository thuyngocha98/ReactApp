import React, {Component} from 'react';
import { View, Text } from 'react-native';
import styles from "../../../styles/FriendsScreenStyles/OweTripMemberScreenStyle/ListItemHeaderMemberStyle";
import Colors from '../../../constants/Colors';


type Props = {
    title?: string,
    itemSelected?: boolean,
}

class ListItemMember extends Component<Props> {
    render() {
        return (
            <View style={[styles.container, {backgroundColor: this.props.itemSelected ? Colors.tintColor : Colors.white}]}>
                <Text style={[styles.text, { color: this.props.itemSelected ? Colors.white : Colors.blackText}]}>{this.props.title}</Text>
            </View>
        );
    }
}

export default ListItemMember;
