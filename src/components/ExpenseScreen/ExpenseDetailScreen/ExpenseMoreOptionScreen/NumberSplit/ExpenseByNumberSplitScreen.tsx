import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Image, FlatList, ScrollView, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5, Octicons } from '@expo/vector-icons';
import ListItemNumberSplit from './ListItemNumberSplit';
import { APPBAR_HEIGHT } from '../../../../../constants/Dimensions';
import Colors from '../../../../../constants/Colors';
import ExpenseByNumberSplitScreenStyles from '../../../../../styles/ExpenseScreenStyles/ExpenseDetailScreenStyles/ExpenseMoreOptionScreenStyles/NumberSplit/ExpenseByNumberSplitScreenStyles';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}


class ExpenseByNumberSplitScreen extends Component<Props> {
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
            <View style={ExpenseByNumberSplitScreenStyles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={ExpenseByNumberSplitScreenStyles.paidBy}>
                    <View style={ExpenseByNumberSplitScreenStyles.imageAvatar}>
                        <Image
                            style={ExpenseByNumberSplitScreenStyles.avatar}
                            source={{ uri: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p240x240/58727386_1340156482789355_8420310201583796224_n.jpg?_nc_cat=106&_nc_oc=AQlOWDOgSxKl2liWeIiLmsRGw5tijfF7YLQaI2T8oMkIUTtBIoI4HOkrwPDO-cFO20udwMX1pDWm-cBSBWtEa1m0&_nc_ht=scontent.fsgn5-6.fna&oh=efb30afdeee8f77b39d35064970794e2&oe=5E3BD8AB" }}
                        />
                    </View>
                    <View style={ExpenseByNumberSplitScreenStyles.content}>
                        <Text style={ExpenseByNumberSplitScreenStyles.txt1}>
                            Paid by
                            <Text style={ExpenseByNumberSplitScreenStyles.txt2}>
                                {" Thủy Ngọc Hà"}
                            </Text>
                        </Text>
                    </View>
                    <View style={ExpenseByNumberSplitScreenStyles.iconRight}>
                        <Octicons name='chevron-right' size={20} color={Colors.lightgray} />
                    </View>
                </View>
                <View style={ExpenseByNumberSplitScreenStyles.underLineInput} />
                <View style={ExpenseByNumberSplitScreenStyles.contentSplit}>
                    <Text style={ExpenseByNumberSplitScreenStyles.title1}>
                        Split equally
                    </Text>
                    <Text style={ExpenseByNumberSplitScreenStyles.title2}>
                        Select which people owe  an equal share.
                    </Text>
                </View>
                <View style={ExpenseByNumberSplitScreenStyles.categoryTypeGroup}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                            navigation.navigate("ExpenseMoreOptionScreen")
                        }}
                    >
                        <Text
                            style={[ExpenseByNumberSplitScreenStyles.equal,
                            [{
                                backgroundColor: Colors.white,
                                color: Colors.tintColor,
                            }]]}
                        > = </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {

                        }}
                    >
                        <Text
                            style={[ExpenseByNumberSplitScreenStyles.number,
                            [{
                                backgroundColor: Colors.tintColor,
                                color: Colors.white,
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
                            style={[ExpenseByNumberSplitScreenStyles.plusOrMinus,
                            [{
                                backgroundColor: Colors.white,
                                color: Colors.tintColor,
                            }]]}
                        >+/-</Text>
                    </TouchableOpacity>
                </View>
                <View style={ExpenseByNumberSplitScreenStyles.flatlist}>
                    <ScrollView>
                        <FlatList
                            data={this.data}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                >
                                    <ListItemNumberSplit
                                        uriAvatar={item.uriAvatar}
                                        nameMember={item.nameMenber}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    </ScrollView>
                </View>
                <View style={ExpenseByNumberSplitScreenStyles.viewTabBar}>
                    <View style={ExpenseByNumberSplitScreenStyles.tabBar}>
                        <View style={ExpenseByNumberSplitScreenStyles.contentBar}>
                            <Text style={ExpenseByNumberSplitScreenStyles.moneyOf} >
                                0,00 US$ of 200,00 US$
                            </Text>
                            <Text style={ExpenseByNumberSplitScreenStyles.totalMoney}>
                                200,00 US$ left
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ExpenseByNumberSplitScreen);