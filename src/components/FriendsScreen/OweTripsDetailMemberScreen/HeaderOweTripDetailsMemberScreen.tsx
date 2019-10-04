import React, {Component} from 'react';
import {View, Text, Image, ImageBackground, Alert, StatusBar} from 'react-native';
import styles from "../../../styles/FriendsScreenStyles/OweTripDetailsMemberScreenStyle/HeaderOweTripDetailsMemberScreenStyle";
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
import {screenWidth} from '../../../constants/Dimensions';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import ListItemMember from "../OweTripsMemberScreen/ListItemMember";
// @ts-ignore
import userMember from "../../../../assets/images/usermember.png";
// @ts-ignore
import triangle2 from "../../../../assets/images/triangle2.png";
// @ts-ignore
import camera from "../../../../assets/images/photo-camera.png";
import ListItemDetailsMember from "./ListItemDetailsMember";

type States = {
    itemSelected?: number,
    navigation?: any,
}

class HeaderOweTripDetailsMemberScreen extends Component<States>{
    static navigationOptions = {
        header: null
    };
    state = {
        itemSelected: 0,
    };
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
    ];


    render() {
        const {navigation} = this.props;
        return (
           <View style={{flex : 1}}>
               <View style={styles.container}>
                   <StatusBar barStyle="dark-content" hidden={false} backgroundColor={"transparent"} translucent/>
                   <ImageBackground
                       source={triangle2}
                       style={styles.backgroundImage}>
                       <View style={styles.header}>
                           <View style={styles.btnBack}>
                               <TouchableOpacity
                                   onPress={() => {
                                       navigation.goBack();
                                   }}
                               >
                                   <Ionicons name='ios-arrow-back' size={30} style={{opacity: 0.5}}/>
                               </TouchableOpacity>
                           </View>
                           <TouchableOpacity style={styles.iconCamera} activeOpacity={0.5}>
                               <Image style={{opacity: 0.5}} source={camera}/>
                           </TouchableOpacity>
                           <View style={styles.btnSetting}>
                               <TouchableOpacity
                                   onPress={() => {
                                       Alert.alert(screenWidth.toString())
                                   }}
                               >
                                   <Ionicons name='ios-settings' size={30} style={{opacity: 0.5}}/>
                               </TouchableOpacity>
                           </View>
                       </View>
                       <View style={styles.contentText}>
                           <Text style={styles.textTitle}>Hotel</Text>
                           <Text style={styles.numberPeopleAndTime}>2 people •	Created thg 9 2019</Text>
                           <View style={styles.owesAndMoney}>
                               <Text style={styles.owes}>Ha owes you </Text>
                               <Text style={styles.money}>325,324,00 US$</Text>
                           </View>
                       </View>
                       <View style={styles.flatList}>
                           <FlatList
                               showsHorizontalScrollIndicator={false}
                               horizontal
                               data={this.data}
                               renderItem={({item}) => (
                                   <TouchableOpacity>
                                       <ListItemMember
                                           title={item.title}
                                           itemSelected={
                                               this.state.itemSelected == item.id
                                           }
                                       />
                                   </TouchableOpacity>
                               )}
                               keyExtractor={item => item.id.toString()}
                           />
                       </View>
                   </ImageBackground>
               </View>
               <View >
                    <ListItemDetailsMember/>
               </View>
           </View>
        );
    }
}

export default HeaderOweTripDetailsMemberScreen;
