import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList, StatusBar} from "react-native";
import Colors from "../../../constants/Colors";
import styles from "../../../styles/ActivityScreenStyles/MainActivityDetailsWhoPaidScreenStyle/MainActivityDetailsWhoPaidScreenStyle";
import {Ionicons, AntDesign, Entypo} from '@expo/vector-icons';
// @ts-ignore
import list from "../../../../assets/images/list.png";
// @ts-ignore
import camera from "../../../../assets/images/photo-camera.png";
// @ts-ignore
import user from "../../../../assets/images/user.png";
import ListItemDetailsWhoPaid from "./ListItemDetailsWhoPaid";
// @ts-ignore
import avatar from '../../../../assets/images/avatar.jpg';

type Props = {
    navigation?: any

};

class MainActivityDetailsWhoPaidScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };
    state = {
        data: [
            {
                id: 0,
                namePaid: 'You',
                money: '50.000,000 US$',
                image: avatar,
                data: [
                    {
                        id: 0,
                        namePaid: 'You',
                        owe: 'owe',
                        money: '25.000,00 US$',
                        image:avatar
                    },
                    {
                        id: 1,
                        namePaid: 'Ha T.',
                        owes: 'owes',
                        money: '25.000,00 US$',
                        image: {uri: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p240x240/58727386_1340156482789355_8420310201583796224_n.jpg?_nc_cat=106&_nc_oc=AQlOWDOgSxKl2liWeIiLmsRGw5tijfF7YLQaI2T8oMkIUTtBIoI4HOkrwPDO-cFO20udwMX1pDWm-cBSBWtEa1m0&_nc_ht=scontent.fsgn5-6.fna&oh=efb30afdeee8f77b39d35064970794e2&oe=5E3BD8AB'},
                    },

                ]
            }
        ]

    };

    _navListener: any;

    componentDidMount() {

        // set barstyle of statusbar
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('dark-content');
        });
    }

    componentWillUnmount() {
        // remove barstyle when lead screen
        this._navListener.remove();
    }

    _ItemSeparatorComponent = () => {
        return (
            <View style={{flex: 1, height: 1, backgroundColor: Colors.lightgray}}/>
        );
    };

    goBack = () => {
       this.props.navigation.goBack();
    };
    render() {
        console.log(this.props.navigation);
        // @ts-ignore
        return (
            <View>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={"transparent"} translucent />
                <View style={{backgroundColor: Colors.tabIconSelected}}>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor={"transparent"} translucent />
                    <View style={styles.header}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.goBack}>
                            <Ionicons name={'ios-arrow-back'} size={35} color={'white'} style={{marginTop: -10}}/>
                        </TouchableOpacity>
                        <Text style={styles.titleDetails}>Details</Text>
                        <TouchableOpacity activeOpacity={0.5}>
                            <AntDesign name={'delete'} size={25} color={'white'}
                                       style={{marginTop: -5, marginRight: 30}}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Entypo name={'edit'} color={'white'} size={25} style={{marginTop: -5}}/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.details}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.icons}>
                            <Image source={list}/>
                        </View>
                        <View style={styles.contentDetails}>
                            <Text style={styles.iconTravel}>Drink</Text>
                            <Text style={styles.money}>11.00US$</Text>
                        </View>
                        <TouchableOpacity style={styles.camera} activeOpacity={0.5}>
                            <Image style={{tintColor: 'gray'}} source={camera}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
                    <View style={{flex: 1.5}}>

                    </View>
                    <View style={styles.personAdd}>
                        <View style={styles.person}>
                            <View style={styles.userBorder}>
                                <Image source={user}/>
                                <Text style={{marginHorizontal: 10, fontSize: 15, fontWeight: '600'}}>ZeTrungMin
                                    Nguyen</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 14, marginBottom: 5, opacity: 0.5}}>Added by you on </Text>
                            <Text style={{fontSize: 14, opacity: 0.5}}>ngày 16 tháng 9, 2019</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 14, marginBottom: 5, opacity: 0.5}}>Last updated by you on </Text>
                            <Text style={{fontSize: 14, opacity: 0.5}}>ngày 18 tháng 9, 2019</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.hr}>
                </View>
                <View>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => (
                            <ListItemDetailsWhoPaid
                                namePaid={item.namePaid}
                                money={item.money}
                                image={item.image}
                                data={item.data}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                        ItemSeparatorComponent={this._ItemSeparatorComponent
                        }
                    />
                </View>
            </View>
        );
    }
}

export default MainActivityDetailsWhoPaidScreen;
