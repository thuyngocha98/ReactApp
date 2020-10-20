import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StatusBar, Dimensions, StyleSheet, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Colors from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { screenWidth } from '../../../constants/Dimensions';
import { BASEURL } from '../../../api/api';

type Props = {
    navigation?: any,
}

type States = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

export class MapPlanScreen extends Component<Props, States> {
    static navigationOptions = {
        header: null
    };

    state = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    }

    componentDidMount() {
        const data = this.props.navigation.getParam('data', '');
        if(data?.data){
            let latitude = (data.data.route.bounds.north + data.data.route.bounds.south) / 2;
            let longitude = (data.data.route.bounds.east + data.data.route.bounds.west) / 2;
            let latDelta = data.data.route.bounds.north - data.data.route.bounds.south;
            let lngDelta = data.data.route.bounds.east - data.data.route.bounds.west;
            let latitudeDelta = 0;
            let longitudeDelta = 0;
            if(latDelta > lngDelta){
                latitudeDelta = latDelta * 1.3;
                longitudeDelta = latitudeDelta * ASPECT_RATIO;
            }else{
                longitudeDelta = lngDelta * 1.3;
                latitudeDelta = longitudeDelta / ASPECT_RATIO;
            }
            
            this.setState({
                latitude,
                longitude,
                latitudeDelta,
                longitudeDelta
            })
        }
    }

    render() {
        const data = this.props.navigation.getParam('data', '');
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <MapView
                 provider={PROVIDER_GOOGLE}
                 style={styles.map}
                 initialRegion={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: this.state.latitudeDelta,
                    longitudeDelta: this.state.longitudeDelta,
                  }}
                >
                {data?.location && data.location.map((marker,i) => (
                    <Marker
                        anchor={{ x: 0.5, y: 0.5 }}
                        title={marker.title}
                        description={marker.desc}
                        key={marker._id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }}
                    >
                        <View>
                            <View style={styles.backgroundMarker}>
                                <Text style={styles.customMarker}>{i + 1}</Text>
                            </View>
                        </View>
                        <Callout>
                            <View style={styles.bubble}>
                                <View style={styles.viewImage}>
                                    <Image 
                                    style={styles.image}
                                    source={{uri: BASEURL + "/images/main/" +  marker.url}}
                                    />
                                </View>
                                <View style={styles.viewTitle}>
                                    <Text numberOfLines={1} style={styles.txtTitle}>{marker.title}</Text>
                                    <Text numberOfLines={2} style={styles.txtDesc}>{marker.desc}</Text>
                                </View>
                            </View>
                        </Callout>
                    </Marker>
                ))}
                </MapView>
                <TouchableOpacity
                 onPress={() => this.props.navigation.goBack()}
                 style={styles.btnGoBack}>
                    <Ionicons name='md-arrow-back' size={30} color={Colors.gray} />
                 </TouchableOpacity>
            </View>
        )
    }
}

export default MapPlanScreen;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    btnGoBack: {
        position: 'absolute',
        top: screenWidth/20,
        left: screenWidth/24,
        paddingVertical: screenWidth/72,
        paddingHorizontal: screenWidth/18,
        borderRadius: screenWidth/24,
        backgroundColor: 'rgba(255,255,255,0.9)'
    },
    backgroundMarker: {
        width: screenWidth / 12,
        height: screenWidth / 12,
        borderRadius: screenWidth / 24,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(247,189,66,0.8)',
        borderWidth: 2,
      },
    customMarker: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.tintColor,
        textAlign: 'center',
    },
    bubble: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewImage: {
        width: screenWidth / 8,
        height: screenWidth / 6.5,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: screenWidth/72,
    },
    image: {
        resizeMode: 'cover',
        width: screenWidth / 8,
        height: screenWidth / 6.5,
    },
    viewTitle: {
        width: screenWidth/2,
    },
    txtTitle: {
        fontSize: 13,
        color: Colors.blackText,
        fontWeight: 'bold',
    },
    txtDesc: {
        fontSize: 12,
        color: Colors.gray
    }
});
