import React, {Component} from 'react';
import {View, Text, StatusBar, StyleSheet, FlatList} from "react-native";
// @ts-ignore
import { SearchBar } from 'react-native-elements';
import {MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import {screenWidth} from "../../../constants/Dimensions";
import Colors from "../../../constants/Colors";
import PlaceItem from "./placeItem";
import place from "../../../models/place";


type Props = {}

type States = {
    text?: string,
    placeData?: any,
    array?: any
}

class MainSearchScreen extends Component<Props, States> {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            placeData: [
                {
                    title: "Nha Trang",
                    description: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
                    image: "https://lh5.googleusercontent.com/p/AF1QipP1cm-BOU-T3BJnw03aeHhCrz48F0RRIRXMfRPZ=w224-h160-k-no",
                    time: "Year 2019"
                },
                {
                    title: "Khánh Hòa",
                    description: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
                    image: "https://lh5.googleusercontent.com/p/AF1QipP1cm-BOU-T3BJnw03aeHhCrz48F0RRIRXMfRPZ=w224-h160-k-no",
                    time: "Year 2019"
                },
                {
                    title: "Đà Nẵng",
                    description: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
                    image: "https://lh5.googleusercontent.com/p/AF1QipP1cm-BOU-T3BJnw03aeHhCrz48F0RRIRXMfRPZ=w224-h160-k-no",
                    time: "Year 2019"
                },
                {
                    title: "Phú Quốc",
                    description: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
                    image: "https://lh5.googleusercontent.com/p/AF1QipP1cm-BOU-T3BJnw03aeHhCrz48F0RRIRXMfRPZ=w224-h160-k-no",
                    time: "Year 2019"
                },
                {
                    title: "Phú Quốc",
                    description: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
                    image: "https://lh5.googleusercontent.com/p/AF1QipP1cm-BOU-T3BJnw03aeHhCrz48F0RRIRXMfRPZ=w224-h160-k-no",
                    time: "Year 2019"
                },
                {
                    title: "Phú Quốc",
                    description: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
                    image: "https://lh5.googleusercontent.com/p/AF1QipP1cm-BOU-T3BJnw03aeHhCrz48F0RRIRXMfRPZ=w224-h160-k-no",
                    time: "Year 2019"
                },
                {
                    title: "Phú Quốc",
                    description: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
                    image: "https://lh5.googleusercontent.com/p/AF1QipP1cm-BOU-T3BJnw03aeHhCrz48F0RRIRXMfRPZ=w224-h160-k-no",
                    time: "Year 2019"
                }
            ]

        }
    }


    static navigationOptions = {
        header: null
    };
    searchFilterFunction = async text => {

    };

    render() {
        return (
            <View>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={"transparent"} translucent/>
                <View style={styles.containerHeader}>
                    <View style={styles.headerNavigation}>
                        <View style={styles.Search}>
                            <View>
                                <Octicons style={styles.iconSearch} size={screenWidth / 22} name={'search'}
                                          color={'gray'}/>
                            </View>
                            <View style={{flex: 1}}>
                                <SearchBar
                                    placeholder="Tìm tên cây..."
                                    lightTheme
                                    clearIcon={{ size: 24, name: 'clear' }}
                                    round={true}
                                    searchIcon={{ size: 26, name: 'search' }}
                                    onChangeText={text => this.searchFilterFunction(text)}
                                    autoCorrect={false}
                                    value={this.state.text}
                                    inputStyle={styles.input}
                                    inputContainerStyle={styles.containerInput}
                                    containerStyle={styles.containerSearchBar}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={this.state.placeData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <PlaceItem item={item}/>
                    )}
                    style={styles.flatListItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerHeader: {
        backgroundColor: Colors.tabIconSelected,
        paddingHorizontal: screenWidth / 40
    },
    headerNavigation: {
        borderRadius: 5,
        paddingVertical: screenWidth / 35,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        marginBottom: screenWidth / 40,
        marginTop: screenWidth / 10,
    },
    Search: {
        flexDirection: "row",
        flex: 1
    },
    iconSearch: {
        marginHorizontal: screenWidth / 30,
        opacity: 0.5
    },
    inputSearch: {
        flex: 1
    },
    flatListItem: {
        marginBottom: 100
    },
    input: {
        width: screenWidth / 2.2,
        height: screenWidth / 9,
        fontSize: 16,
        color: 'black'
    },
    containerInput: {
        backgroundColor: Colors.tabIconSelected,
        borderRadius: screenWidth / 18,
        elevation: 0,
    },
    containerSearchBar: {
        marginHorizontal: screenWidth / 120,
        height: screenWidth / 4,
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderBottomColor: Colors.white,
    },
});

export default MainSearchScreen;
