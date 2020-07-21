import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, StatusBar } from 'react-native';
import ListItemGroupStyles from '../../../styles/ExpenseScreenStyles/MainExpenseScreenStyles/ListItemGroupStyles';
import Colors from '../../../constants/Colors';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    nameGroup?: string,
    currenGroup?: boolean,
}

class ListItemGroup extends Component<Props> {
    render() {
        return (
            <View style={ListItemGroupStyles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={ListItemGroupStyles.sectionList}>
                    <View style={ListItemGroupStyles.icon}>
                        <Image
                            style={[ListItemGroupStyles.iconHome, {tintColor: Colors.mediumseagreen}]}
                            source={require("../../../../assets/images/icon-home.png")}
                        />
                    </View>
                    <View style={ListItemGroupStyles.textNameGroup}>
                        <Text style={ListItemGroupStyles.nameGroup}>
                            {this.props.nameGroup}
                        </Text>
                    </View>
                </View>
                <View style={ListItemGroupStyles.underLine} />
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ListItemGroup);