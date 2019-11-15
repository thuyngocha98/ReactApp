import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";
import {screenWidth} from "../../../constants/Dimensions";
import PlaceItem1 from "./PlaceItem1";

type Props = {}

type States = {
    text?: string,
    placeData?: any,
    array?: any
}


class MainSearchScreen1 extends Component<Props,States> {
    constructor(props) {
        super(props);
        this.state = {
            placeData: [
                {
                    title: "Khánh Hòa",
                    image: "https://lh6.googleusercontent.com/proxy/bwNHxiQ1EJvGIhlMVOgyc-jM2iVVl0_QDycxkjRkN0EGCyqUW9pe0QuebYURQN5DYrLKjxgXZLPREk09_llY3ONT8a14D8NGWJeF2C2ohNQ0T4_mDCqgOU2h9UyJ3vwXgJo4D4T4jKHzXtOOmtpLFXgmpPU=w357-h238-k-no",
                    description:"Pongour Falls & Đà Lạt Cathedral"
                },
                {
                    title: "Đà Nẵng",
                    image: "https://lh6.googleusercontent.com/proxy/Y95dsgBSwgsyK0wSrQJ633lfOj4kVT8DljfQEvLyebT_4wcwPf3EtkEgVOvxIGH8fC1wtvuEcWn8fDUKINYTRGQWFjYMOa0XPttQ2ViyrR4qAj3DcE6R6RuT2oe6LF0P4hOIuyT2QUjR4sWsQWh9k-K58So=w350-h180-n-k-no",
                    description:"Beaches, islands & the Po Nagar towers"
                },
                {
                    title: "Phú Quốc",
                    image: "https://lh4.googleusercontent.com/proxy/__QprE4GE53G2dKo98KwrLyllq-l4HKiGNRA7GAkNRNZD2rX120dlmn6Mjutqb-Pl8LQ8ew-vh0GolU8FyD7NoCytE7MJvulIl8CBOky6Q3tSWJhqD6B_uka8S_fZZ55bcC__Ndq7uG7GBTGoxqdycIrxXk=w350-h180-n-k-no",
                    description:"Vạn Thủy Tú Temple & Mũi Né beach"
                },
                {
                    title: "Đà Lạt",
                    image: "https://lh3.googleusercontent.com/proxy/LTEaXIN90P0rY6LW9gf6RBmT_LwKyU2pOwCdbQPSMSujORggyNjIpuA56emDCzu3RElUM8zwWA-Thzp6oEceORVl7AwTrm0W5z7KLEV4vL0d5Kjv_KIq-GxIrMS9cfX6vYnPh0BlSI7NjQ4zSS9p5Yh1UHs=w350-h180-n-k-no",
                    description: "Villa Blanche, beaches, 32m Jesus statue"
                },
                {
                    title: "Phan Thiết",
                    image: "https://lh5.googleusercontent.com/-RyIlgiCsGcY/WD57q0q08qI/AAAAAAAADVg/BxDpewF2j34KppkSXIKOvPc87S1Jq8qEwCLIB/w350-h180-n-k-no/",
                    description:"City known for Cai Rang floating market"
                },
                {
                    title: "Bà Rịa Vũng Tàu",
                    image: "https://lh3.googleusercontent.com/proxy/zErjehFP7FItrDMfTB4c01308f5S05hbVusbaVs3de8jXUklUM1g3zc4kg-knnEHqHAdkMpQU3vyWiFW37K7jVSApJLQ9hSpm6MWRe_GxCdcHh4uaS2CpEfo_8807pVvfLyeFm5WmAi0FgWySgsV7SRY9Vw=w350-h180-n-k-no",
                    description:"Bach Ma Temple & Đồng Xuân Market"
                }
            ]
        }
    }


    static navigationOptions = {
        title: 'Place',
        headerStyle: {
            backgroundColor: Colors.tabIconSelected,
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: Colors.white,
            alignSelf: 'center',
            fontSize: screenWidth / 18,
            textAlign:"center",
            flex:1
        },
    };

    render() {
        return (
            <View >
                <FlatList
                    data={this.state.placeData}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                            <PlaceItem1 item={item}/>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default MainSearchScreen1;

