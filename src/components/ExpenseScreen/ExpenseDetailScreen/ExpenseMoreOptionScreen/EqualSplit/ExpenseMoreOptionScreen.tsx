import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APPBAR_HEIGHT } from '../../../../../constants/Dimensions';
import Colors from '../../../../../constants/Colors';
import { View, TouchableOpacity, Text, Image, FlatList, ScrollView, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import ExpenseMoreOptionScreenStyles from '../../../../../styles/ExpenseScreenStyles/ExpenseDetailScreenStyles/ExpenseMoreOptionScreenStyles/EqualSplit/ExpenseMoreOptionScreenStyles';
import ListItemMemberExpense from './ListItemMemberExpense';
import ListItemNumberSplit from '../NumberSplit/ListItemNumberSplit';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}

class ExpenseMoreOptionScreen extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Expense details",
            headerStyle: {
                elevation: 0,
                textAlign: 'center',
                height: APPBAR_HEIGHT,
                backgroundColor: Colors.tintColor,
            },
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                color: Colors.white
            },
            headerRight:
                (
                    <View style={{ marginRight: 15 }}>
                        <Text style={{ fontSize: 17, color: Colors.white }}>Done</Text>
                    </View>
                ),
            headerLeft:
                (
                    <View style={{ marginLeft: 15 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Ionicons name='ios-close' size={45} color={Colors.white} />
                        </TouchableOpacity>
                    </View >
                )
        };
    };

    data = [
        {
            id: 0,
            uriAvatar: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p240x240/58727386_1340156482789355_8420310201583796224_n.jpg?_nc_cat=106&_nc_oc=AQlOWDOgSxKl2liWeIiLmsRGw5tijfF7YLQaI2T8oMkIUTtBIoI4HOkrwPDO-cFO20udwMX1pDWm-cBSBWtEa1m0&_nc_ht=scontent.fsgn5-6.fna&oh=efb30afdeee8f77b39d35064970794e2&oe=5E3BD8AB",
            nameMenber: "Thủy Ngọc Hà",
        },
        {
            id: 1,
            uriAvatar: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p240x240/58727386_1340156482789355_8420310201583796224_n.jpg?_nc_cat=106&_nc_oc=AQlOWDOgSxKl2liWeIiLmsRGw5tijfF7YLQaI2T8oMkIUTtBIoI4HOkrwPDO-cFO20udwMX1pDWm-cBSBWtEa1m0&_nc_ht=scontent.fsgn5-6.fna&oh=efb30afdeee8f77b39d35064970794e2&oe=5E3BD8AB",
            nameMenber: "Thủy Ngọc Hà",
        },
    ]


    render() {
        const { navigation } = this.props
        return (
            <View style={ExpenseMoreOptionScreenStyles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={ExpenseMoreOptionScreenStyles.paidBy}>
                    <View style={ExpenseMoreOptionScreenStyles.imageAvatar}>
                        <Image
                            style={ExpenseMoreOptionScreenStyles.avatar}
                            source={{ uri: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p240x240/58727386_1340156482789355_8420310201583796224_n.jpg?_nc_cat=106&_nc_oc=AQlOWDOgSxKl2liWeIiLmsRGw5tijfF7YLQaI2T8oMkIUTtBIoI4HOkrwPDO-cFO20udwMX1pDWm-cBSBWtEa1m0&_nc_ht=scontent.fsgn5-6.fna&oh=efb30afdeee8f77b39d35064970794e2&oe=5E3BD8AB" }}
                        />
                    </View>
                    <View style={ExpenseMoreOptionScreenStyles.content}>
                        <Text style={ExpenseMoreOptionScreenStyles.txt1}>
                            Paid by
                            <Text style={ExpenseMoreOptionScreenStyles.txt2}>
                                {" Thủy Ngọc Hà"}
                            </Text>
                        </Text>
                    </View>
                    <View style={ExpenseMoreOptionScreenStyles.iconRight}>
                        <FontAwesome5 name='chevron-right' size={20} color={Colors.lightgray} />
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
                            navigation.navigate("ExpenseByNumberSplitScreen")
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
                            navigation.navigate("ExpenseByPlusOrMinusScreen")
                        }}
                    >
                        <Text
                            style={[ExpenseMoreOptionScreenStyles.plusOrMinus,
                            [{
                                backgroundColor: Colors.white,
                                color: Colors.tintColor,
                            }]]}
                        >+/-</Text>
                    </TouchableOpacity>
                </View>
                <View style={ExpenseMoreOptionScreenStyles.flatlist}>
                    <ScrollView>
                        <FlatList
                            data={this.data}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                >
                                    <ListItemMemberExpense
                                        uriAvatar={item.uriAvatar}
                                        nameMember={item.nameMenber}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    </ScrollView>
                </View>
                <View style={ExpenseMoreOptionScreenStyles.viewTabBar}>
                    <View style={ExpenseMoreOptionScreenStyles.tabBar}>
                        <View style={ExpenseMoreOptionScreenStyles.contentBar}>
                            <Text style={ExpenseMoreOptionScreenStyles.moneyPerson} >
                                127,50 US$/person
                        </Text>
                            <Text style={ExpenseMoreOptionScreenStyles.numberPeople}>
                                {`(2 people)`}
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
                                <Ionicons name='ios-checkmark-circle' size={35} color={Colors.mediumseagreen} />
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