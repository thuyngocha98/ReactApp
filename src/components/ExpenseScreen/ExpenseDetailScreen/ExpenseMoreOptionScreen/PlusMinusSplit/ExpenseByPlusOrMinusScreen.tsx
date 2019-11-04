import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Image, FlatList, ScrollView, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5, Octicons } from '@expo/vector-icons';
import { APPBAR_HEIGHT } from '../../../../../constants/Dimensions';
import Colors from '../../../../../constants/Colors';
import ListItemPlusOrMinus from './ListItemPlusOrMinus';
import ExpenseByPlusOrMinusStyles from '../../../../../styles/ExpenseScreenStyles/ExpenseDetailScreenStyles/ExpenseMoreOptionScreenStyles/PlusOrMinusSplit/ExpenseByPlusOrMinusStyles';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}


class ExpenseByPlusOrMinusScreen extends Component<Props> {
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
            <View style={ExpenseByPlusOrMinusStyles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={ExpenseByPlusOrMinusStyles.paidBy}>
                    <View style={ExpenseByPlusOrMinusStyles.imageAvatar}>
                        <Image
                            style={ExpenseByPlusOrMinusStyles.avatar}
                            source={{ uri: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p240x240/58727386_1340156482789355_8420310201583796224_n.jpg?_nc_cat=106&_nc_oc=AQlOWDOgSxKl2liWeIiLmsRGw5tijfF7YLQaI2T8oMkIUTtBIoI4HOkrwPDO-cFO20udwMX1pDWm-cBSBWtEa1m0&_nc_ht=scontent.fsgn5-6.fna&oh=efb30afdeee8f77b39d35064970794e2&oe=5E3BD8AB" }}
                        />
                    </View>
                    <View style={ExpenseByPlusOrMinusStyles.content}>
                        <Text style={ExpenseByPlusOrMinusStyles.txt1}>
                            Paid by
                            <Text style={ExpenseByPlusOrMinusStyles.txt2}>
                                {" Thủy Ngọc Hà"}
                            </Text>
                        </Text>
                    </View>
                    <View style={ExpenseByPlusOrMinusStyles.iconRight}>
                        <Octicons name='chevron-right' size={20} color={Colors.lightgray} />
                    </View>
                </View>
                <View style={ExpenseByPlusOrMinusStyles.underLineInput} />
                <View style={ExpenseByPlusOrMinusStyles.contentSplit}>
                    <Text style={ExpenseByPlusOrMinusStyles.title1}>
                        Split equally
                    </Text>
                    <Text style={ExpenseByPlusOrMinusStyles.title2}>
                        Select which people owe  an equal share.
                    </Text>
                </View>
                <View style={ExpenseByPlusOrMinusStyles.categoryTypeGroup}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                            navigation.navigate("ExpenseMoreOptionScreen")
                        }}
                    >
                        <Text
                            style={[ExpenseByPlusOrMinusStyles.equal,
                            [{
                                backgroundColor: Colors.white,
                                color: Colors.tintColor,
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
                            style={[ExpenseByPlusOrMinusStyles.number,
                            [{
                                backgroundColor: Colors.white,
                                color: Colors.tintColor,
                            }]]}
                        >1.23</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {

                        }}
                    >
                        <Text
                            style={[ExpenseByPlusOrMinusStyles.plusOrMinus,
                            [{
                                backgroundColor: Colors.tintColor,
                                color: Colors.white,
                            }]]}
                        >+/-</Text>
                    </TouchableOpacity>
                </View>
                <View style={ExpenseByPlusOrMinusStyles.flatlist}>
                    <ScrollView>
                        <FlatList
                            data={this.data}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                >
                                    <ListItemPlusOrMinus
                                        uriAvatar={item.uriAvatar}
                                        nameMember={item.nameMenber}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ExpenseByPlusOrMinusScreen);