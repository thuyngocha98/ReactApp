import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    View,
    TouchableOpacity,
    StyleSheet, Text, 
    Image, 
    ScrollView,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import Colors from '../../../constants/Colors';
import { APPBAR_HEIGHT, screenWidth } from '../../../constants/Dimensions';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { BASEURL } from '../../../api/api';
import Constants from 'expo-constants';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}

type States = {
    data?: any[],
    loading?: boolean,
    destination?: any[]
}

class PlanTripScreen extends Component<Props, States> {
    static navigationOptions = {
        header: null
    };

    state = {
        data: [],
        loading: true,
        destination: []
    }

    focusListener: any;

    componentDidMount() {
        const code = this.props.navigation.getParam('code', '');
        this.callApiGetPlan(code);
        this.focusListener = this.props.navigation.addListener("didFocus",() => {
            // Update your data
            const destination = this.props.navigation.getParam('destination', '');
            if(destination){
                let location = this.state.data.location.concat(destination);
                this.callApiOptimize(location);
            }
        });
    }

    componentWillUnmount() {
        // remove event listener
        this.focusListener.remove();
    }

    callApiGetPlan = code => {
        this.setState({ loading: true })
        fetch(`${BASEURL}/api/search/get_plan_location/${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        })
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    data: res,
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
                console.log(error);
            });
    }


    removeDestination = (location,index) => {
        let newArr = [...location];
        newArr.splice(index,1);
        this.callApiOptimize(newArr);
    }

    callApiOptimize = location => {
        this.setState({ loading: true })
        let json = {
            location: location
        }
        fetch(`${BASEURL}/api/search/optimize_route_location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body : JSON.stringify(json)
        })
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    data: res,
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
                console.log(error);
            });
    }

    render() {
        const RenderItem = ({index,title, desc, url}) => (
            <View style={styles.viewItem}>
                <View style={styles.indexItem}>
                    <View style={styles.viewNumber}>
                        <Text style={styles.txtNumber}>{index+1}</Text>
                    </View>
                    <View style={styles.lineNumber} />
                </View>
                <View style={styles.viewTitleItem}>
                    <Text numberOfLines={1} style={styles.txtTitleItem}>{title}</Text>
                    <Text numberOfLines={3} style={styles.txtDescItem}>{desc == "null" ? "Not yet description" : desc}</Text>
                </View>
                <View style={styles.viewImage}>
                    <Image
                        style={styles.image}
                        source={{uri: BASEURL + "/images/main/" +  url}} 
                    />
                </View>
                <TouchableOpacity
                 onPress={() => this.removeDestination(this.state.data.location,index)}
                 style={styles.viewRemove}>
                    <AntDesign name='delete' size={18} color={Colors.gray}/>
                </TouchableOpacity>
            </View>
        )
        
        const RenderTimeAndDistance = ({distance, time}) => (
            <View style={styles.viewMainTimeAndDistance}>
                <View style={styles.viewLineAndCar}>
                    <View style={styles.lineTopCar} />
                    <Ionicons name="md-car" color={Colors.gray} size={18} />
                    <View style={styles.lineTopCar} />
                </View>
                <View style={styles.timeAndDistance}>
                    <Text style={styles.txtDescItem}>{distance == undefined ? 'Sorry, we could not calculate driving directions' :
                    Math.round((distance/1000)*100)/100 + " km  -  " +  Math.round(time/60) + " phút"}</Text>
                </View>
            </View>
        )
        const data = this.props.navigation.getParam('data', '');
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.tintColor} translucent />
                <View style={styles.containerHeader}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.headerLeft}
                            activeOpacity={0.5}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        >
                            <Ionicons name='md-arrow-back' size={28} color={Colors.white} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Planning of travel</Text>
                        <TouchableOpacity
                            style={styles.headerRight}
                            activeOpacity={0.5}
                            onPress={() => {
                                console.log('aaaa')
                            }}
                        >
                            <Text style={styles.textHeaderRight}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.viewTitle}>
                    <View>
                        <Text style={styles.txtTitle}>Detail plan</Text>
                        <View style={styles.underTitle} />
                    </View>
                    <TouchableOpacity
                     onPress={() => this.props.navigation.navigate('MapPlanScreen', {data: this.state.data})}
                     style={styles.viewMap}>
                        <FontAwesome5 name='map-marked-alt' size={20} color={Colors.gray}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.viewContent}>
                    {this.state.loading ? (
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator animating size="large" color={Colors.tintColor} />
                        </View>
                    ) : (
                        <>
                            {this.state.data?.location.map((item, index) => (
                                <View key={item._id}>
                                    <RenderItem
                                        index={index}
                                        title={item.title}
                                        desc={item.desc}
                                        url={item.url} />
                                    {this.state.data?.data?.route?.legs[index] ? (
                                        <RenderTimeAndDistance
                                            key={this.state.data?.data.route.legs[index].distance}
                                            distance={this.state.data?.data.route.legs[index].distance}
                                            time={this.state.data?.data.route.legs[index].duration} />
                                    ) : (
                                        <RenderTimeAndDistance
                                            key={index}
                                            distance={undefined}
                                            time={undefined} />
                                    )}
                                </View>
                            ))}
                            <TouchableOpacity
                             onPress={() => {
                                this.props.navigation.navigate('AddDestinationScreen',{data: data});
                             }}
                             style={styles.viewBtn}>
                                <Text style={styles.txtBtn}>Add Destination</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    containerHeader: {
        width: screenWidth,
        height: APPBAR_HEIGHT + Constants.statusBarHeight,
        backgroundColor: Colors.tabIconSelected
    },
    header: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center',
    },
    headerLeft: {
        paddingLeft: screenWidth/27,
        paddingRight: screenWidth/24,
        paddingVertical: screenWidth/72,
    },
    headerRight: {
        paddingLeft: screenWidth/24,
        paddingRight: screenWidth/27,
        paddingVertical: screenWidth/72,
    },
    textHeaderRight: {
        fontSize: 17,
        color: Colors.white
    },
    viewTitle: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        paddingLeft: screenWidth/ 30,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtTitle: {
        color: Colors.tintColor,
        fontSize: 15,
        fontWeight: 'bold'
    },
    underTitle: {
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.tintColor
    },
    linearGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        width: "100%",
        height: screenWidth / 18,
    },
    viewContent: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    viewItem: {
        flexDirection: 'row',
        paddingLeft: screenWidth / 30,
    },
    indexItem: {
        alignItems: 'center',
        marginRight: screenWidth/24,
    },
    viewNumber: {
        width: screenWidth/15,
        height: screenWidth/15,
        borderRadius: screenWidth/30,
        borderWidth: 2,
        borderColor: Colors.tintColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtNumber: {
        color: Colors.tintColor,
        fontSize: 13,
    },
    lineNumber: {
        flex: 1,
        backgroundColor: Colors.lightgray,
        width: 1,
    },
    viewTitleItem: {
        flex: 2,
    },
    txtTitleItem: {
        color: Colors.blackText,
        fontSize: 14,
        fontWeight: 'bold'
    },
    txtDescItem: {
        fontSize: 14,
        color: Colors.gray,
    },
    viewImage: {
        marginHorizontal: screenWidth/72,
        width: screenWidth / 6.04,
        height: screenWidth / 4.566,
        borderRadius: 8,
        overflow: 'hidden'
    },
    image: {
        resizeMode: 'cover',
        width: screenWidth / 6.04,
        height: screenWidth / 4.566,
    },
    viewRemove: {
        paddingHorizontal: screenWidth/36,
        alignSelf: 'center'
    },
    viewMainTimeAndDistance: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: screenWidth / 30,
    },
    lineTopCar: {
        width: 1,
        height: screenWidth/24,
        backgroundColor: Colors.lightgray,
    },
    viewLineAndCar: {
        width: screenWidth/15,
        alignItems: 'center',
        marginRight: screenWidth/24,
    },
    timeAndDistance: {
        flex: 1,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewBtn: {
        alignSelf: 'center',
        width: screenWidth/1.5,
        height: screenWidth/10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: screenWidth/24,
        backgroundColor: Colors.tintColor,
        borderRadius: 8,
    },
    txtBtn: {
        color: Colors.white,
        fontSize: 18,
    },
    viewMap: {
        padding: screenWidth/ 30,
    }
});

export default connect(
    mapStateToProps,
)(PlanTripScreen);