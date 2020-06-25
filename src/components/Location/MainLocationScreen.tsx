import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Polyline, Circle, Overlay, Heatmap, Geojson } from 'react-native-maps';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { screenHeight, screenWidth } from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import MapViewDirections from 'react-native-maps-directions';


type props = {
    navigation?: any
}

const origin = { latitude: 10.8813279, longitude: 106.8060503 };
const destination = { latitude: 10.8813279, longitude: 110.8060503 };
const GOOGLE_MAPS_APIKEY = '…';

class MainLocationScreen extends Component<props> {

    static navigationOptions = {
        header: null,//works with createStackNavigator but not with createBottomTabNavigator
    };



    render() {
        const navigation = this.props.navigation.getParam('navigation');
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <View style={styles.header}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            navigation.navigate('AccountScreen')
                        }}
                        style={{ flexDirection: 'row' }}
                    >
                        <Ionicons name='ios-arrow-back' size={32} color={Colors.tintColor} />
                        <Text style={styles.back}>Back</Text>
                    </TouchableOpacity>
                </View>
                <MapView style={styles.mapStyle}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: 10.8813279,
                        longitude: 106.8060503,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 10.8813279, longitude: 106.8060503 }}
                        title={'An Coffee'}
                    >

                    </Marker>
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                    />
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        width: screenWidth,
        height: screenHeight / 14,
        backgroundColor: Colors.white,
        alignItems: 'center',
        paddingLeft: 10
    },
    mapStyle: {
        width: screenWidth,
        height: screenHeight,
    },
    back: {
        color: Colors.tintColor,
        fontSize: 20,
        marginLeft: 7,
        marginTop: 2
    }
});

export default MainLocationScreen;
