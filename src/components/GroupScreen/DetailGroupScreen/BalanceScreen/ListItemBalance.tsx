import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Colors from '../../../../constants/Colors';
import ListItemBalanceStyles from '../../../../styles/GroupsStyles/DetailGroupScreenStyles/BalanceScreen/ListItemBalanceStyles';
import { number2money, thumbnails } from '../../../../constants/FunctionCommon';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    avatarMain?: string,
    money?: string,
    name?: string,
    isGetBack?: boolean,
    nameSub?: string,
    moneySub?: string,
    nameSecondSub?: string,
    data?: any[]
}

type States = {
    isShow?: boolean
}

class ListItemBalance extends Component<Props, States> {

    state = {
        isShow: false
    }

    remind = () => {
        alert('aa')
    };
    render() {
        const thumbnail = thumbnails["avatar" + this.props.data.avatar]
        return (
            <View style={ListItemBalanceStyles.container}>
                <View style={ListItemBalanceStyles.firtItem}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={ListItemBalanceStyles.touchStyle}
                        onPress={() => {
                            this.setState({
                                isShow: !this.state.isShow
                            })
                        }}
                    >
                        <View style={ListItemBalanceStyles.avatar}>
                            <Image
                                style={ListItemBalanceStyles.photo}
                                source={thumbnail}
                            />
                        </View>
                        <View style={ListItemBalanceStyles.title}>
                            <Text style={ListItemBalanceStyles.name}>
                                {this.props.data.name}
                            <Text style={ListItemBalanceStyles.normal}>
                                    {this.props.data.totalBalanceTrip >= 0 ? " gets back " : " owes "}
                                </Text>
                                <Text style={[ListItemBalanceStyles.money, { color: this.props.data.totalBalanceTrip >= 0 ? Colors.mediumseagreen : Colors.orangered}]}>
                                    {this.props.data.totalBalanceTrip >= 0 ? number2money(this.props.data.totalBalanceTrip) : number2money(this.props.data.totalBalanceTrip*(-1)) } VND
                                    <Text style={ListItemBalanceStyles.normal}>
                                        {" in total"}
                                    </Text>
                                </Text>
                            </Text>
                        </View>
                        <View style={ListItemBalanceStyles.icon}>
                            <MaterialCommunityIcons name={this.state.isShow ? 'unfold-less-horizontal' : 'unfold-more-horizontal'} size={25} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>{this.state.isShow ? (
                    <View style={ListItemBalanceStyles.containerSecond}>
                        <View style={ListItemBalanceStyles.secondItem}>
                            {/* <View style={ListItemBalanceStyles.iconSecond}>
                                <Entypo name='level-down' size={17} color={Colors.lightgray} />
                            </View>
                            <View style={ListItemBalanceStyles.avatarSecond}>
                                <Image
                                    style={ListItemBalanceStyles.photoSecond}
                                    source={{ uri: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p240x240/58727386_1340156482789355_8420310201583796224_n.jpg?_nc_cat=106&_nc_oc=AQlOWDOgSxKl2liWeIiLmsRGw5tijfF7YLQaI2T8oMkIUTtBIoI4HOkrwPDO-cFO20udwMX1pDWm-cBSBWtEa1m0&_nc_ht=scontent.fsgn5-6.fna&oh=efb30afdeee8f77b39d35064970794e2&oe=5E3BD8AB" }}
                                />
                            </View>
                            <View style={ListItemBalanceStyles.text}>
                                <Text style={ListItemBalanceStyles.nameSecond}>
                                    {this.props.nameSub}
                            <Text style={ListItemBalanceStyles.normalSecond}>
                                        {this.props.isGetBack ? " owes " : " gets back "}
                                        <Text style={[ListItemBalanceStyles.moneySecond, { color: this.props.isGetBack ? Colors.mediumseagreen : Colors.orangered }]}>
                                            {this.props.moneySub}
                                    <Text style={ListItemBalanceStyles.normalSecond}>
                                                {" to "}
                                                <Text style={ListItemBalanceStyles.nameSecond}>
                                                    {this.props.nameSecondSub}
                                        </Text>
                                            </Text>
                                        </Text>
                                    </Text>
                                </Text>
                            </View> */}
                        </View>
                        <View style={ListItemBalanceStyles.button}>
                            <TouchableOpacity
                                onPress={() => { this.remind() }}
                            >
                                <View style={ListItemBalanceStyles.btn}>
                                    <Text style={ListItemBalanceStyles.txt}>Remind</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { Alert.alert("Settle Up") }}
                            >
                                <View style={ListItemBalanceStyles.btn}>
                                    <Text style={ListItemBalanceStyles.txt}>Settle Up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
                </View>
                <View style={ListItemBalanceStyles.lineBottom}></View>
            </View>
        );
    }
}

export default connect(
    mapStateToProps,
)(ListItemBalance);
