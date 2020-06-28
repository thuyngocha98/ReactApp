import React, {Component} from 'react';
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    Polygon,
} from 'react-native-maps';
import {StyleSheet, View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {screenHeight, screenWidth} from '../../constants/Dimensions';
import Colors from '../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


type Props = {
    navigation?: any;
};

type States = {
    location?: any;
    coordinates?: any
}


class MainLocationScreen extends Component<Props, States> {
    static navigationOptions = {
        header: null, //works with createStackNavigator but not with createBottomTabNavigator
    };

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            coordinates: [
                {latitude: 37.8025259, longitude: -122.4351431},
                {latitude: 37.7896386, longitude: -122.421646},
                {latitude: 37.7665248, longitude: -122.4161628},
                {latitude: 37.7734153, longitude: -122.4577787},
                {latitude: 37.7948605, longitude: -122.4596065},
                {latitude: 37.8025259, longitude: -122.4351431}
            ]
        }
    }

    // componentDidMount = () => {
    //     this.getMyLocation().then(r => console.log(r));
    // };
    //
    // getMyLocation = async () => {
    //     // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //     // if (status !== 'granted') {
    //     //     this.setState({
    //     //         location: 'Permission denied',
    //     //     });
    //     //     return ;
    //     // }
    //     let location = await Location.getCurrentPositionAsync({});
    //     console.log(location);
    //     // this.setState({
    //     //     location: JSON.stringify(location)
    //     // });
    // };

    render() {
        const navigation = this.props.navigation.getParam('navigation');
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <View style={styles.header}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            navigation.navigate('AccountScreen');
                        }}
                        style={{flexDirection: 'row'}}
                    >
                        <Ionicons name="ios-arrow-back" size={32} color={Colors.tintColor}/>
                        <Text style={styles.back}>Back</Text>
                    </TouchableOpacity>
                </View>
                <MapView
                    style={styles.mapStyle}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: 37.8025259,
                        longitude: -122.4351431,
                        latitudeDelta: 0.15,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Polygon coordinates={this.state.coordinates}
                             strokeColor={Colors.lightgray}
                             strokeWidth={1}
                             fillColor={'rgba(100,100,200,0.3)'}
                    />
                    {this.state.coordinates.map((marker, i) => (
                        <Marker
                            key={i}
                            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                            title={'San Francisco'}
                        >
                        </Marker>
                    ))}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        width: screenWidth,
        height: screenHeight / 14,
        backgroundColor: Colors.white,
        alignItems: 'center',
        paddingLeft: 10,
    },
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
    },
    back: {
        color: Colors.tintColor,
        fontSize: 20,
        marginLeft: 7,
        marginTop: 2,
    },
});

export default MainLocationScreen;
