import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ImageBackground, Alert } from 'react-native';
import HeaderTitleComponentStyles from '../../../styles/GroupsStyles/DetailGroupScreenStyles/HeaderTitleComponentStyles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import ListItemHeader from './ListItemHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { screenWidth } from '../../../constants/Dimensions';
function mapStateToProps(state) {
    return {

    };
}

type States = {
    itemSelected?: number,
}

class HeaderTitleComponent extends Component<States> {

    state = {
        itemSelected: 0,
    }
    data = [
        {
            id: 0,
            title: "Settle up"
        },
        {
            id: 1,
            title: "Balances"
        },
        {
            id: 2,
            title: "Totals"
        },
        {
            id: 3,
            title: "Charts"
        },
        {
            id: 4,
            title: "Convert to USD"
        },
        {
            id: 5,
            title: "Whiteboard"
        },
        {
            id: 6,
            title: "Export"
        },
    ]

    _onScroll =  () => {
        Alert.alert(event.nativeEvent.contentOffset.y)
    }
    render() {
        return (
            <View style={HeaderTitleComponentStyles.container}>
                <ImageBackground
                    source={{ uri: "https://designroast.org/wp-content/uploads/2014/02/pattern-thepatternlibrary.png" }}
                    style={HeaderTitleComponentStyles.backgroundImage}>
                    <Image
                        style={HeaderTitleComponentStyles.iconCamera}
                        source={require("../../../../assets/images/icon_camera.png")}
                    />
                    <Text style={HeaderTitleComponentStyles.textTitle}>Hotel</Text>
                    <Text style={HeaderTitleComponentStyles.numberPeopleAndTime}>2 people •	Created thg 9 2019</Text>
                    <View style={HeaderTitleComponentStyles.owesAndMoney}>
                        <Text style={HeaderTitleComponentStyles.owes}>Trung owes you </Text>
                        <Text style={HeaderTitleComponentStyles.money}>325,324,00 US$</Text>
                    </View>
                    <View style={HeaderTitleComponentStyles.flatList}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={this.data}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            itemSelected: item.id,
                                        })
                                    }}
                                >
                                    <ListItemHeader
                                        title={item.title}
                                        itemSelected={
                                            this.state.itemSelected == item.id ?
                                                true : false
                                        }
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                        <LinearGradient
                            colors={['rgba(0,0,0,0.8)', 'transparent']}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right:  375,
                                top: 0,
                                height: 55,
                            }}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 0.8, y: 0.5 }}
                        />
                        <LinearGradient
                            colors={['rgba(0,0,0,0.8)', 'transparent']}
                            style={{
                                position: 'absolute',
                                left: 375,
                                right: 0,
                                top: 0,
                                height: 55,
                            }}
                            start={{ x: 1, y: 0.5 }}
                            end={{ x: 0.2, y: 0.5 }}
                        />

                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default connect(mapStateToProps)(HeaderTitleComponent);