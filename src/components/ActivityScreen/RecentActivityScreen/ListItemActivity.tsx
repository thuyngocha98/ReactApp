import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from "react-native";
import styles from "../../../styles/ActivityScreenStyles/RecentActivityScreenStyle/ListItemActivityStyle";
import Colors from "../../../constants/Colors";
// @ts-ignore
import avatar from '../../../../assets/images/avatar.jpg';
// @ts-ignore
import toast from "../../../../assets/images/toast.png";


type Props = {
    type?:string
    typeImage?: any
    avatar?: any
    name?: string
    method?: string
    nameItem?: string
    nameFriend:string
    group?: string
    owe?:string
    money?: string
    date?: string
    time?: string
}

class ListItemActivity extends Component<Props> {
    render() {
        const {type, typeImage,avatar,name,method,nameItem,group,money,date,time,nameFriend,owe} = this.props;
        if (type === 'addItem'){
            // @ts-ignore
            return (
                <View>
                    <View style={styles.container}>
                        <View style={styles.container1}>
                            <Image style={styles.toast} source={typeImage}/>
                            <Image style={styles.avatar} source={avatar}/>
                        </View>
                        <View >
                            <View style={styles.flexRow}>
                                <Text style={styles.bold}>{name} </Text>
                                <Text style={styles.size}>{method} </Text>
                                <Text style={styles.bold}>{nameItem} </Text>
                                <Text style={styles.bold}>{nameFriend} </Text>
                                <Text style={styles.size}>in </Text>
                                <Text style={styles.bold}>{group} </Text>
                            </View>
                            <View>
                                <View style={styles.flexRow}>
                                    <Text style={owe === 'You get back $' ? styles.color : owe === 'You owe $' ? {color: 'red'} : {color: '#c7a854'} }>{owe} </Text>
                                    <Text style={owe === 'You get back $' ? styles.color : owe === 'You owe $' ? {color: 'red'} : {color: 'mediumseagreen'} }>{money}</Text>
                                </View>
                                <View style={styles.flexRow}>
                                    <Text style={styles.time}>{date} at </Text>
                                    <Text style={styles.time}>{time}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.hr}>

                    </View>
                </View>
            );
        } else if (type === 'addMembers'){
            return (
                <View>
                    <View style={styles.container}>
                        <View style={styles.container1}>
                            <Image style={styles.toast} source={typeImage}/>
                            <Image style={styles.avatar} source={avatar}/>
                        </View>
                        <View >
                            <View style={styles.flexRow}>
                                <Text style={styles.bold}>{name} </Text>
                                <Text style={styles.size}>{method} </Text>
                                <Text style={styles.bold}>{nameItem} </Text>
                                <Text style={styles.bold}>{nameFriend} </Text>
                                <Text style={styles.size}>in </Text>
                                <Text style={styles.bold}>{group} </Text>
                            </View>
                            <View>
                                <View style={styles.flexRow}>
                                    <Text style={styles.time}>{date} at </Text>
                                    <Text style={styles.time}>{time}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.hr}>

                    </View>
                </View>
            );
        } else  if (type === 'create' || type === 'delete'){
            return (
                <View>
                    <View style={styles.container}>
                        <View style={styles.container1}>
                            <Image style={styles.toast} source={typeImage}/>
                            <Image style={styles.avatar} source={avatar}/>
                        </View>
                        <View >
                            <View style={styles.flexRow}>
                                <Text style={styles.bold}>{name} </Text>
                                <Text style={styles.size}>{method} </Text>
                                <Text style={styles.size}> the group </Text>
                                <Text style={styles.bold}>{group} </Text>
                            </View>
                            <View>
                                <View style={styles.flexRow}>
                                    <Text style={styles.time}>{date} at </Text>
                                    <Text style={styles.time}>{time}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.hr}>

                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <View style={styles.container}>
                        <View style={styles.container1}>
                            <Image style={styles.toast} source={typeImage}/>
                            <Image style={styles.avatar} source={avatar}/>
                        </View>
                        <View >
                            <View style={styles.flexRow}>
                                <Text style={styles.bold}>{name} </Text>
                                <Text style={styles.size}>{method} </Text>
                                <Text style={styles.bold}>{nameItem} </Text>
                                <Text style={styles.bold}>{nameFriend} </Text>
                                <Text style={styles.size}>in </Text>
                                <Text style={styles.bold}>{group} </Text>
                            </View>
                            <View>
                                <View style={styles.flexRow}>
                                    <Text style={owe === 'You get back $' ? styles.color : owe === 'You owe $' ? {color: 'red'} : {color: '#c7a854'} }>{owe} </Text>
                                    <Text style={owe === 'You get back $' ? styles.color : owe === 'You owe $' ? {color: 'red'} : {color: 'mediumseagreen'} }>{money}</Text>
                                </View>
                                <View style={styles.flexRow}>
                                    <Text style={styles.time}>{date} in </Text>
                                    <Text style={styles.time}>{time}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.hr}>

                    </View>
                </View>
            );
        }
    }
}

export default ListItemActivity;
