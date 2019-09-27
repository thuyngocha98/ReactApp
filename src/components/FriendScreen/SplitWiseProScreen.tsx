import React, {Component} from 'react';
import {View, Text, Image, Button, TouchableOpacity, ScrollView} from "react-native";
import Colors from "../../constants/Colors";
import styles from "../../styles/FriendStyles/SplitWiseProScreenStyle";
import {AntDesign} from "@expo/vector-icons";
// @ts-ignore
import money from "../../assets/images/money.png";
import Layout from "../../constants/Layout";

type Props = { navigation }

class SplitWiseProScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    onGoBackAddFriendsScreen = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View>
                <View style={{backgroundColor: Colors.splitWise}}>
                    <View style={styles.header}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onGoBackAddFriendsScreen}>
                            <Text style={styles.close}>Close</Text>
                        </TouchableOpacity>
                        <Text style={styles.splitWisePro}>Splitwise Pro</Text>
                    </View>
                </View>
                    <ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <View style={styles.details}>
                                <View style={styles.money}>
                                    <Image source={money}/>
                                    <View style={{marginLeft: 10}}>
                                        <Text style={styles.splitWise}>Splitwise</Text>
                                        <Text style={styles.pro}>PRO</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <AntDesign name={'search1'} size={15} style={{marginRight: 5}}/>
                                    <Text style={{fontSize: 15}}>Expense Search</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <AntDesign name={'search1'} size={15} style={{marginRight: 5}}/>
                                    <Text style={{fontSize: 15}}>A totally a-free experience</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <AntDesign name={'search1'} size={15} style={{marginRight: 5}}/>
                                    <Text style={{fontSize: 15}}>Currency conversion</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <AntDesign name={'search1'} size={15} style={{marginRight: 5}}/>
                                    <Text style={{fontSize: 15}}>Receipt scanning</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <AntDesign name={'search1'} size={15} style={{marginRight: 5}}/>
                                    <Text style={{fontSize: 15}}>Itemization</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <AntDesign name={'search1'} size={15} style={{marginRight: 5}}/>
                                    <Text style={{fontSize: 15}}>Chart and graphs</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <AntDesign name={'search1'} size={15} style={{marginRight: 5}}/>
                                    <Text style={{fontSize: 15}}>Save default splits</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <AntDesign name={'search1'} size={15} style={{marginRight: 5}}/>
                                    <Text style={{fontSize: 15}}>Plus more goodies to come!</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 15}}>
                                <Text style={styles.free}>Start with</Text>
                                <Text style={[styles.free, {color: Colors.splitWise}]}> 1 month free</Text>
                                <Text style={styles.free}>, followed by</Text>
                            </View>
                            <View>
                                <TouchableOpacity activeOpacity={0.5} style={styles.payment}>
                                    <Text
                                        style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>VND35000/month</Text>
                                </TouchableOpacity >
                                <Text style={styles.or}> or </Text>
                                <TouchableOpacity activeOpacity={0.5} style={styles.payment}>
                                    <Text
                                        style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>VND349000/year</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.save}>Save VND71000/year</Text>
                            </View>
                            <View>
                                <TouchableOpacity activeOpacity={0.5} onPress={this.onGoBackAddFriendsScreen}>
                                    <Text style={styles.notNow}>Not now, thanks</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingHorizontal:30, marginBottom:100}}>
                                <Text style={{textAlign:'left'}}>
                                    Recurring billing, cancel anytime.
                                    Your subscription will be immediately charged to your iTunes account,
                                    and auto-renews unless disabled 24 hours before the end of the billing cycle.
                                    You can manage your subscription by going to iTunes Account Settings.
                                </Text>
                                <Text style={styles.term}>Terms of Service + Privacy Policy </Text>
                            </View>
                        </View>

                    </ScrollView>

            </View>
        );
    }
}

export default SplitWiseProScreen;
