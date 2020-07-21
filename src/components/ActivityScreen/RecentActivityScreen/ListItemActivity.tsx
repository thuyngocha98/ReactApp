import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from "react-native";
import styles from "../../../styles/ActivityScreenStyles/RecentActivityScreenStyle/ListItemActivityStyle";
import Colors from "../../../constants/Colors";
// @ts-ignore
import avatar from '../../../../assets/images/avatar.jpg';
// @ts-ignore
import toast from "../../../../assets/images/toast.png";
// @ts-ignore
import beach from "../../../../assets/images/beach.png";
// @ts-ignore
import puzzle from "../../../../assets/images/puzzle.png";
// @ts-ignore
import remove from "../../../../assets/images/remove.png";
import { thumbnails, number2money } from '../../../constants/FunctionCommon';


type Props = {
    data?: any[]
}

class ListItemActivity extends Component<Props> {
    render() {
        // if (this.props.data.type === 'addItem'){
        //     // @ts-ignore
        //     return (
        //         <View>
        //             <View style={styles.container}>
        //                 <View style={styles.container1}>
        //                     <Image style={styles.toast} source={typeImage}/>
        //                     <Image style={styles.avatar} source={avatar}/>
        //                 </View>
        //                 <View >
        //                     <View style={styles.flexRow}>
        //                         <Text style={styles.bold}>{name} </Text>
        //                         <Text style={styles.size}>{method} </Text>
        //                         <Text style={styles.bold}>{nameItem} </Text>
        //                         <Text style={styles.bold}>{nameFriend} </Text>
        //                         <Text style={styles.size}>in </Text>
        //                         <Text style={styles.bold}>{group} </Text>
        //                     </View>
        //                     <View>
        //                         <View style={styles.flexRow}>
        //                             <Text style={owe === 'You get back $' ? styles.color : owe === 'You owe $' ? {color: 'red'} : {color: '#c7a854'} }>{owe} </Text>
        //                             <Text style={owe === 'You get back $' ? styles.color : owe === 'You owe $' ? {color: 'red'} : {color: 'mediumseagreen'} }>{money}</Text>
        //                         </View>
        //                         <View style={styles.flexRow}>
        //                             <Text style={styles.time}>{date} at </Text>
        //                             <Text style={styles.time}>{time}</Text>
        //                         </View>
        //                     </View>
        //                 </View>
        //             </View>
        //             <View style={styles.hr}>

        //             </View>
        //         </View>
        //     );
        // } else if (type === 'addMembers'){
        //     return (
        //         <View>
        //             <View style={styles.container}>
        //                 <View style={styles.container1}>
        //                     <Image style={styles.toast} source={typeImage}/>
        //                     <Image style={styles.avatar} source={avatar}/>
        //                 </View>
        //                 <View >
        //                     <View style={styles.flexRow}>
        //                         <Text style={styles.bold}>{name} </Text>
        //                         <Text style={styles.size}>{method} </Text>
        //                         <Text style={styles.bold}>{nameItem} </Text>
        //                         <Text style={styles.bold}>{nameFriend} </Text>
        //                         <Text style={styles.size}>in </Text>
        //                         <Text style={styles.bold}>{group} </Text>
        //                     </View>
        //                     <View>
        //                         <View style={styles.flexRow}>
        //                             <Text style={styles.time}>{date} at </Text>
        //                             <Text style={styles.time}>{time}</Text>
        //                         </View>
        //                     </View>
        //                 </View>
        //             </View>
        //             <View style={styles.hr}>

        //             </View>
        //         </View>
        //     ); else if
        if (this.props.data.type === 'created_trip') {
            const thumbnail = thumbnails["avatar" + this.props.data.user_id.avatar]
            const date = this.props.data.create_date
            var time = date.split(/[\s-T:]+/)
            var name = this.props.data.user_id.name.split(/[\s ]+/)
            return (
                <View>
                    <View style={styles.container}>
                        <View style={styles.container1}>
                            <Image style={styles.toast} source={beach} />
                            <Image style={styles.avatar} source={thumbnail} />
                        </View>
                        <View >
                            <View style={styles.flexRow}>
                                <Text style={styles.bold}>{name[name.length - 1]} {this.props.data.user_id.name[0]}. </Text>
                                <Text style={[styles.size,{color: Colors.mediumseagreen}]}>created</Text>
                                <Text style={styles.size}> the group </Text>
                                <Text style={styles.bold}>{this.props.data.trip_id.name} </Text>
                            </View>
                            <View>
                                <View style={styles.flexRow}>
                                    <Text style={styles.time}>ngày {time[2]} thg {time[1]}, {time[0]} at </Text>
                                    <Text style={styles.time}>{time[3]}:{time[4]}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.hr} />
                </View>
            );
        } else if (this.props.data.type === 'created_transaction') {
            const thumbnail = thumbnails["avatar" + this.props.data.user_id.avatar]
            const date = this.props.data.create_date
            var time = date.split(/[\s-T:]+/)
            var name = this.props.data.user_id.name.split(/[\s ]+/)
            var nameTransaction = this.props.data.transaction_id.name
            return (
                <View>
                    <View style={styles.container}>
                        <View style={styles.container1}>
                            <Image style={styles.toast} source={puzzle} />
                            <Image style={styles.avatar} source={thumbnail} />
                        </View>
                        <View >
                            <View style={styles.flexRow}>
                                <Text style={styles.bold}>{name[name.length - 1]} {this.props.data.user_id.name[0]}. </Text>
                                <Text style={styles.size}>added </Text>
                                <Text style={styles.bold}>{nameTransaction} </Text>
                                <Text style={styles.size}>in </Text>
                                <Text style={styles.bold}>{this.props.data.trip_id.name} </Text>
                            </View>
                            <View>
                                <View style={styles.flexRow}>
                                    <Text style={{ color: Colors.mediumseagreen }}>Total money {number2money(this.props.data.transaction_id.amount)} VND</Text>
                                </View>
                                <View style={styles.flexRow}>
                                    <Text style={styles.time}>ngày {time[2]} thg {time[1]}, {time[0]} at </Text>
                                    <Text style={styles.time}>{time[3]}:{time[4]}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.hr}>

                    </View>
                </View>
            );
        } else if (this.props.data.type === 'deleted_trip') {
            const thumbnail = thumbnails["avatar" + this.props.data.user_id.avatar]
            const date = this.props.data.delete_date
            var time = date.split(/[\s-T:]+/)
            var name = this.props.data.user_id.name.split(/[\s ]+/)
            return (
                <View>
                    <View style={styles.container}>
                        <View style={styles.container1}>
                            <Image style={styles.toast} source={remove} />
                            <Image style={styles.avatar} source={thumbnail} />
                        </View>
                        <View >
                            <View style={styles.flexRow}>
                                <Text style={styles.bold}>{name[name.length - 1]} {this.props.data.user_id.name[0]}. </Text>
                                <Text style={[styles.size,{color: Colors.orangered}]}>removed</Text>
                                <Text style={styles.size}> the group </Text>
                                <Text style={styles.bold}>{this.props.data.trip_id.name} </Text>
                            </View>
                            <View>
                                <View style={styles.flexRow}>
                                    <Text style={styles.time}>ngày {time[2]} thg {time[1]}, {time[0]} at </Text>
                                    <Text style={styles.time}>{time[3]}:{time[4]}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.hr} />
                </View>
            );
        }
         else {
            return (<View><Text>aaaa</Text></View>);

        }
        // } else {
        //     return (
        //         <View>
        //             <View style={styles.container}>
        //                 <View style={styles.container1}>
        //                     <Image style={styles.toast} source={typeImage}/>
        //                     <Image style={styles.avatar} source={avatar}/>
        //                 </View>
        //                 <View >
        //                     <View style={styles.flexRow}>
        //                         <Text style={styles.bold}>{name} </Text>
        //                         <Text style={styles.size}>{method} </Text>
        //                         <Text style={styles.bold}>{nameItem} </Text>
        //                         <Text style={styles.bold}>{nameFriend} </Text>
        //                         <Text style={styles.size}>in </Text>
        //                         <Text style={styles.bold}>{group} </Text>
        //                     </View>
        //                     <View>
        //                         <View style={styles.flexRow}>
        //                             <Text style={owe === 'You get back $' ? styles.color : owe === 'You owe $' ? {color: 'red'} : {color: '#c7a854'} }>{owe} </Text>
        //                             <Text style={owe === 'You get back $' ? styles.color : owe === 'You owe $' ? {color: 'red'} : {color: 'mediumseagreen'} }>{money}</Text>
        //                         </View>
        //                         <View style={styles.flexRow}>
        //                             <Text style={styles.time}>{date} in </Text>
        //                             <Text style={styles.time}>{time}</Text>
        //                         </View>
        //                     </View>
        //                 </View>
        //             </View>
        //             <View style={styles.hr}>

        //             </View>
        //         </View>
        //     );

    }
}

export default ListItemActivity;
