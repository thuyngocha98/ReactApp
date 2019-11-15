import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {screenWidth} from "../../../constants/Dimensions";

type Props = {
    item?: any
}

type States = {}

class PlaceItem extends Component<Props, States> {
    render() {
        const {item} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.containerPlace}>
                    <TouchableOpacity>
                        <Image source={{uri: item.image}} style={styles.image}/>
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <TouchableOpacity>
                            <Text style={styles.title}>{item.title}</Text>
                        </TouchableOpacity>
                        <Text style={styles.description}>{item.description}</Text>
                        <View style={styles.time}>
                            <Text>{item.time}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.hr}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    containerPlace: {
        flexDirection: "row",
        margin: screenWidth / 40
    },
    image: {
        borderRadius:5,
        width: screenWidth / 3,
        height: screenWidth / 4,
    },
    content: {
        flex: 1,
        marginLeft: screenWidth / 30,
        marginTop: -screenWidth / 50
    },
    title: {
        fontSize: screenWidth / 18,
    },
    description: {
        flex:1,
        fontSize: screenWidth / 28,
        opacity: 0.6
    },
    time: {

    },
    hr: {
        height: 1,
        backgroundColor: 'gray',
        opacity: 0.3
    }
});

export default PlaceItem;
