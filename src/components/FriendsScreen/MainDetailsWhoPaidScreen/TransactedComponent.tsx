import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from "react-native";
import styles from "../../../styles/FriendsScreenStyles/MainDetailsWhoPaidScreenStyle/TransactedComponentStyle";
// @ts-ignore
import list from "../../../../assets/images/list.png";
// @ts-ignore
import camera from "../../../../assets/images/photo-camera.png";
// @ts-ignore
import user from "../../../../assets/images/user.png";



class TransactedComponent extends Component {
    render() {
        return (
            <View>
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
            </View>
        );
    }
}

export default TransactedComponent;
