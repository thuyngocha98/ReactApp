import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image} from "react-native";
import {screenWidth} from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";

type Props = {
    item?: any
}

type States = {}

class PlaceItem1 extends Component<Props, States> {
    render() {
        const {item} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.5} style={{flex:1}}>
                    <ImageBackground source={{uri: item.image}} style={styles.image} imageStyle={{borderRadius: 10}}>
                        <View style={styles.content}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 10,
    },
    image: {
        flex: 1,
        justifyContent: "flex-end",
        width: screenWidth / 2 - 15,
        height: screenWidth / 2,
    },
    title: {
        fontSize: screenWidth / 20,
        fontWeight: "bold",
        color: Colors.white,
    },
    description: {
        fontWeight: "bold",
        color: Colors.white,
    },
    content: {
        marginBottom:5,
        marginHorizontal: 5,
    }
});

export default PlaceItem1;
