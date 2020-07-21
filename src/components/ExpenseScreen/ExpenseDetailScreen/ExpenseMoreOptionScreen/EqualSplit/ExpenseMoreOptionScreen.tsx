import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APPBAR_HEIGHT } from '../../../../../constants/Dimensions';
import Colors from '../../../../../constants/Colors';
import { View, TouchableOpacity, Text, Image, FlatList, ScrollView, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5, Octicons } from '@expo/vector-icons';
import ExpenseMoreOptionScreenStyles from '../../../../../styles/ExpenseScreenStyles/ExpenseDetailScreenStyles/ExpenseMoreOptionScreenStyles/EqualSplit/ExpenseMoreOptionScreenStyles';
import { thumbnails, number2money } from '../../../../../constants/FunctionCommon';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}

type States = {
    arrChecked?: any[],
    moneysigle?: number,
    numberPeople?: number,
    checkAll?: boolean,
}

class ExpenseMoreOptionScreen extends Component<Props, States> {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };
    listUser: any[];

    constructor(props){
        super(props);
        this.state = {
            arrChecked: [],
            moneysigle: 0,
            numberPeople: 0,
            checkAll: true,
        }
    }

    componentDidMount(){
        let totalMoney = this.props.navigation.getParam('totalMoney', "")
        let list_user = this.props.navigation.getParam('list_user', "")
        this.checkRealTime(list_user, totalMoney)
    }

    checkRealTime(list_user, totalMoney) {
        var numberPeopleSplit = 0;
        for (let i = 0; i < list_user.length; i++) {
            if (this.state.arrChecked[i] == true)
                numberPeopleSplit++;
        }

        if (numberPeopleSplit < list_user.length) {
            const amount_user = Math.round(totalMoney / numberPeopleSplit)
            this.setState({
                moneysigle: amount_user,
                numberPeople: numberPeopleSplit,
                checkAll: false,
            })
            
        }
        else{
            const amount_user = Math.round(totalMoney / list_user.length)
            this.setState({
                moneysigle: amount_user,
                numberPeople: list_user.length,
                checkAll: true,
            })
        }

    }

    createListUser(list_user,totalMoney){
        var numberPeopleSplit = 0;
        for (let i = 0; i < list_user.length; i++){
            if(this.state.arrChecked[i] == true)
                numberPeopleSplit++;
        }

        if (numberPeopleSplit < list_user.length){
            const amount_user = Math.round(totalMoney / numberPeopleSplit)
            for (let i = 0; i < list_user.length; i++) {
                if (this.state.arrChecked[i] == true)
                    list_user[i].amount_user = amount_user;
                else
                    list_user[i].amount_user = 0;
            }
        }
        
        this.props.navigation.navigate("InputExpenseScreen", { listTypeUser: list_user });
    }

    render() {
        const { navigation } = this.props
        this.listUser = navigation.getParam('listUser', "");
        const totalMoney = navigation.getParam('totalMoney', "")
        const list_user = navigation.getParam('list_user', "")
        const userPayer = navigation.getParam('userPayer', [])
        const thumbnail = userPayer.user_id.avatar.length > 2 ? { uri: `data:image/png;base64,${userPayer.user_id.avatar}` } : thumbnails["avatar" + userPayer.user_id.avatar]
        return (
            <View style={ExpenseMoreOptionScreenStyles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={ExpenseMoreOptionScreenStyles.containerHeader}>
                    <View style={ExpenseMoreOptionScreenStyles.header}>
                        <TouchableOpacity
                            style={ExpenseMoreOptionScreenStyles.cancel}
                            activeOpacity={0.5}
                            onPress={() => {
                                navigation.navigate("InputExpenseScreen");
                            }}
                        >
                            <Ionicons name='ios-close' size={45} color={Colors.white} />
                        </TouchableOpacity>
                        <Text style={ExpenseMoreOptionScreenStyles.addContact}>Expense details</Text>
                        <TouchableOpacity
                            style={ExpenseMoreOptionScreenStyles.save}
                            activeOpacity={0.5}
                            onPress={() => {
                                this.createListUser(list_user, totalMoney)
                            }}
                        >
                            <Text
                                style={ExpenseMoreOptionScreenStyles.add}
                            >
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={ExpenseMoreOptionScreenStyles.paidBy}>
                    <View style={ExpenseMoreOptionScreenStyles.imageAvatar}>
                        <Image
                            style={ExpenseMoreOptionScreenStyles.avatar}
                            source={thumbnail}
                        />
                    </View>
                    <View style={ExpenseMoreOptionScreenStyles.content}>
                        <Text style={ExpenseMoreOptionScreenStyles.txt1}>
                            {`Paid by `}
                            <Text style={ExpenseMoreOptionScreenStyles.txt2}>
                                {userPayer.user_id.name}
                            </Text>
                        </Text>
                    </View>
                    <View style={ExpenseMoreOptionScreenStyles.iconRight}>
                        <Octicons name='chevron-right' size={20} color={Colors.lightgray} />
                    </View>
                </View>
                <View style={ExpenseMoreOptionScreenStyles.underLineInput} />
                <View style={ExpenseMoreOptionScreenStyles.contentSplit}>
                    <Text style={ExpenseMoreOptionScreenStyles.title1}>
                        Split equally
                    </Text>
                    <Text style={ExpenseMoreOptionScreenStyles.title2}>
                        Select which people owe  an equal share.
                    </Text>
                </View>
                <View style={ExpenseMoreOptionScreenStyles.categoryTypeGroup}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                            
                        }}
                    >
                        <Text
                            style={[ExpenseMoreOptionScreenStyles.equal,
                            [{
                                backgroundColor: Colors.tintColor,
                                color: Colors.white,
                            }]]}
                        > = </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                            navigation.navigate("ExpenseByNumberSplitScreen", { listUser: this.listUser, list_user: list_user, totalMoney: totalMoney, userPayer: userPayer, thumbnail: thumbnail })
                        }}
                    >
                        <Text
                            style={[ExpenseMoreOptionScreenStyles.number,
                            [{
                                backgroundColor: Colors.white,
                                color: Colors.tintColor,
                            }]]}
                        >1.23</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                            navigation.navigate("ExpenseByPlusOrMinusScreen", { listUser: this.listUser, list_user: list_user, totalMoney: totalMoney, userPayer: userPayer, thumbnail: thumbnail })
                        }}
                    >
                        <Text
                            style={[ExpenseMoreOptionScreenStyles.plusOrMinus,
                            [{
                                backgroundColor: Colors.white,
                                color: Colors.tintColor,
                            }]]}
                        >custom</Text>
                    </TouchableOpacity>
                </View>
                <View style={ExpenseMoreOptionScreenStyles.flatlist}>
                    <ScrollView>
                        <FlatList
                            data={this.listUser}
                            extraData={this.state}
                            renderItem={({ item, index }) => (
                                this.state.arrChecked[index] = this.state.arrChecked[index] === undefined ? true : this.state.arrChecked[index],
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={async () => {
                                        let { arrChecked } = this.state;
                                        if(arrChecked[index] === undefined)
                                            arrChecked[index] = true
                                        arrChecked[index] = !arrChecked[index]
                                        await this.setState({
                                            arrChecked,
                                        })
                                        this.checkRealTime(list_user, totalMoney)
                                    }}
                                >
                                    <View style={ExpenseMoreOptionScreenStyles.flatlistMember}>
                                        <View style={ExpenseMoreOptionScreenStyles.listMember}>
                                            <View style={ExpenseMoreOptionScreenStyles.imageAvatar}>
                                                <Image
                                                    style={[ExpenseMoreOptionScreenStyles.avatar, { opacity: this.state.arrChecked[index] ? 1 : 0.3}]}
                                                    source= {item.user_id.avatar.length > 2 ? {uri: `data:image/png;base64,${item.user_id.avatar}` } : thumbnails["avatar" + item.user_id.avatar]}
                                                />
                                            </View>
                                            <View style={ExpenseMoreOptionScreenStyles.content}>
                                                <Text style={[ExpenseMoreOptionScreenStyles.txt2, { color: this.state.arrChecked[index] ? Colors.black : Colors.gray}]}>
                                                    {item.user_id.name}
                                                </Text>
                                            </View>
                                            <View style={ExpenseMoreOptionScreenStyles.iconRight}>
                                                <Ionicons 
                                                    name='ios-checkmark-circle'
                                                    size={35} 
                                                    color={this.state.arrChecked[index] ? Colors.mediumseagreen : Colors.gray } 
                                                />
                                            </View>
                                        </View>
                                        <View style={ExpenseMoreOptionScreenStyles.underLineInput} />
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.user_id._id.toString()}
                        />
                    </ScrollView>
                </View>
                <View style={ExpenseMoreOptionScreenStyles.viewTabBar}>
                    <View style={ExpenseMoreOptionScreenStyles.tabBar}>
                        <View style={ExpenseMoreOptionScreenStyles.contentBar}>
                            <Text style={ExpenseMoreOptionScreenStyles.moneyPerson} >
                                {number2money(this.state.moneysigle)} VND/person
                        </Text>
                            <Text style={ExpenseMoreOptionScreenStyles.numberPeople}>
                                {`(` + this.state.numberPeople + ` people)`} 
                            </Text>
                        </View>
                        <View style={ExpenseMoreOptionScreenStyles.viewSeparate} >
                            <View style={ExpenseMoreOptionScreenStyles.separate} />
                        </View>
                        <View style={ExpenseMoreOptionScreenStyles.all}>
                            <Text style={ExpenseMoreOptionScreenStyles.txtAll}>
                                All
                        </Text>
                            <View style={ExpenseMoreOptionScreenStyles.iconAll}>
                                <Ionicons name='ios-checkmark-circle' size={35} color={this.state.checkAll ? Colors.mediumseagreen : Colors.gray} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ExpenseMoreOptionScreen);