import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    View,
    TouchableOpacity,
    StyleSheet, Text, 
    Image, 
    ScrollView,
    ActivityIndicator,
    StatusBar,
    Dimensions,
    TextInput
} from 'react-native';
import Colors from '../../../constants/Colors';
import { APPBAR_HEIGHT, screenHeight, screenWidth } from '../../../constants/Dimensions';
import { Ionicons, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { BASEURL } from '../../../api/api';
import Constants from 'expo-constants';
import Modal from 'react-native-modal';

function mapStateToProps(state) {
    return {
      userId: state.dataUser.dataUser._id,
    };
}

type Props = {
    userId?: any;
    navigation?: any,
}

type States = {
    data?: any[],
    loading?: boolean,
    destination?: any[]
    modalVisible?: boolean,
    modalSaveVisible?: boolean,
    modalOptionVisible?: boolean,
    indexDelete?: number,
    nameDelete?: string,
    indexOption?: number,
    namePlan?: string,
    dataTrip?: any[],
    loadingTrip?: boolean,
    indexSelectTrip?: number
}

class PlanTripScreen extends Component<Props, States> {
    static navigationOptions = {
        header: null
    };

    state = {
        data: [],
        loading: true,
        destination: [],
        modalVisible: false,
        modalOptionVisible: false,
        modalSaveVisible: false,
        indexDelete: -1,
        nameDelete: "",
        indexOption: 0,
        namePlan: "plan 1",
        dataTrip: [],
        loadingTrip: true,
        indexSelectTrip: -1
    }

    focusListener: any;

    componentDidMount() {
        const code = this.props.navigation.getParam('code', '');
        if(code != -1)
            this.callApiGetPlan(code);
        else
            this.setState({loading: false})
        this.focusListener = this.props.navigation.addListener("didFocus",() => {
            // Update your data
            const destination = this.props.navigation.getParam('destination', '');
            if(destination){
                let location = destination;
                if(this.state.data?.location){
                    let data = [...this.state.data.location]
                    data.splice(1,0,...destination); // add new location into middle array
                    location = data;
                }
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
                    loading: false,
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
                console.log(error);
            });
    }

    onToggleModal = () => {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    onToggleModalOption = () => {
        this.setState({modalOptionVisible: !this.state.modalOptionVisible})
    }

    onToggleModalSave = () => {
        this.setState({modalSaveVisible: !this.state.modalSaveVisible})
    }

    onRemoveDestination = () => {
        this.onToggleModal()
        let newArr = [...this.state.data.location];
        newArr.splice(this.state.indexDelete,1);
        if(newArr.length > 0)
            this.callApiOptimize(newArr);
    }

    onPressDeleteDestination = (index, title) => {
        this.setState({nameDelete: title})
        this.onToggleModal()
        this.setState({indexDelete: index}) 
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
                    loading: false,
                })
                this.props.navigation.setParams({destination: null})
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
                console.log(error);
            });
    }

    getListTrip = () => {
        this.setState({ loadingTrip: true })
        fetch(`${BASEURL}/api/trip/get_all_trip_by_user_id/${this.props.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        })
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    dataTrip: res.data,
                    loadingTrip: false,
                })
            })
            .catch((error) => {
                this.setState({
                    loadingTrip: false
                })
                console.log(error);
            });
    }

    navigateToDetail = (data, title) => {
        let item = {}
        for(let i = 0; i < data.length; i++){
            if(data[i].title == title){
                item = data[i];
                break;
            }
        }
        this.props.navigation.navigate('DescriptionLocationScreen', {data: item})
    }

    onPressOption = index => {
        this.setState({indexOption: index})
        this.onToggleModalOption();
    }

    onPressSelectOption = type => {
        let location = [...this.state.data.location];
        let place = location.splice(this.state.indexOption,1);
        if(type == 'start'){
            location.unshift(place[0])
        }else{
            location.push(place[0])
        }
        this.onToggleModalOption();
        this.callApiOptimize(location);
    }



    onPressSave = () => {
        if(this.state.data?.location && this.state.data?.location.length > 0){
            this.getListTrip()
            this.onToggleModalSave();
        }
    }

    onCreatePlan = () => {
        let code = this.state.data.location[0].code;
        let tripId = "";
        if(this.state.indexSelectTrip > -1){
            tripId = this.state.dataTrip[this.state.indexSelectTrip]._id;
        }

        let json = {
            tripId : tripId,
            code: code,
            name: this.state.namePlan,
            location: this.state.data.location
        }
        fetch(`${BASEURL}/api/plan/create_plan/${this.props.userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body : JSON.stringify(json)
        })
            .then((response) => response.json())
            .then((res) => {
                // this.setState({
                //     dataTrip: res.data,
                //     loadingTrip: false,
                // })
                this.props.navigation.goBack();
            })
            .catch((error) => {
                this.setState({
                    loadingTrip: false
                })
                console.log(error);
            });
        this.onToggleModalSave();
    }

    onCancelSave = () => {
        this.onToggleModalSave()
        this.setState({
            namePlan: "plan 1",
            indexSelectTrip: -1,
        })
    }

    render() {
        const RenderItem = ({index, title, desc, url, data}) => (
            <View style={styles.viewItem}>
                <View style={styles.indexItem}>
                    <View style={styles.viewNumber}>
                        <Text style={styles.txtNumber}>{index+1}</Text>
                    </View>
                    <View style={styles.lineNumber} />
                </View>
                <TouchableOpacity
                 onPress={() => this.navigateToDetail(data, title)}
                 style={styles.viewTitleAndImage}>
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
                </TouchableOpacity>
                <View style={styles.viewOptionAndRemove}>
                    <TouchableOpacity
                     style={styles.viewRemove}
                     onPress={() => this.onPressDeleteDestination(index, title)}
                    >
                        <AntDesign name='delete' size={18} color={Colors.gray}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                     onPress={() => this.onPressOption(index)}
                     style={styles.viewOption}
                    >
                        <View style={styles.option}>
                            <Text style={styles.txtOption}>
                                {index == 0 ? "start"
                                : index == this.state.data.location.length - 1 ? "end"
                                : "--:--"
                                }
                            </Text>
                            <AntDesign name='caretdown' size={12} color={Colors.gray}/>
                        </View>
                    </TouchableOpacity>
                </View>
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
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="transparent" translucent />
                {/* view modal */}
                <Modal
                isVisible={this.state.modalVisible}
                style={styles.mainModal}
                coverScreen={false}
                deviceHeight={Dimensions.get('screen').height}
                onBackdropPress={this.onToggleModal}
                >
                    <View style={styles.viewModal}>
                        <Text style={styles.txtTitleModal}>
                            {`Are you sure you want to remove ${this.state.nameDelete} ?`}
                        </Text>
                        <View style={styles.viewBtnModal}>
                            <TouchableOpacity
                             onPress={this.onToggleModal}
                             style={[styles.btnModal,{borderRightWidth: 1,borderRightColor: Colors.lavender}]}>
                                <Text style={styles.txtBtnModal}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                             onPress={this.onRemoveDestination}
                             style={styles.btnModal}>
                                <Text style={styles.txtBtnModal}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* view modal option */}
                <Modal
                isVisible={this.state.modalOptionVisible}
                style={styles.mainModal}
                coverScreen={false}
                deviceHeight={Dimensions.get('screen').height}
                onBackdropPress={this.onToggleModalOption}
                >
                    <View style={styles.viewModal}>
                        <Text style={styles.txtTitleModal}>
                            {`Select this place as: `}
                        </Text>
                        <TouchableOpacity 
                         onPress={() => this.onPressSelectOption('start')} 
                         style={styles.viewBtnModalOption}>
                            <Text style={styles.txtModalOption}>Start place</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                         onPress={() => this.onPressSelectOption('end')} 
                         style={styles.viewBtnModalOption}>
                            <Text style={styles.txtModalOption}>End place</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* view modal save */}
                <Modal
                avoidKeyboard
                isVisible={this.state.modalSaveVisible}
                style={styles.mainModalSave}
                coverScreen={false}
                deviceHeight={Dimensions.get('screen').height}
                >
                    <View style={styles.viewModalSave}>
                        <Text style={styles.txtTitleModalSave}>
                            Name of the plan
                        </Text>
                        <TextInput
                            autoFocus
                            autoCorrect={false}
                            maxLength={50}
                            placeholder="Enter name of the plan"
                            style={styles.input}
                            onChangeText={text => this.setState({namePlan: text})}
                            value={this.state.namePlan}
                        />
                        {this.state.loadingTrip ? (
                            <View style={styles.selectTrip}>
                                <ActivityIndicator animating size="small" color={Colors.tintColor} />
                            </View>
                        ) : (
                            this.state.dataTrip &&
                            <View style={styles.selectTrip}>
                                <Text style={styles.txtTitleModalSave}>
                                    Select a trip
                                </Text>
                                <ScrollView
                                 keyboardShouldPersistTaps="handled"
                                 style={styles.listTrip}>
                                    {this.state.dataTrip.map((item,index) => (
                                        <TouchableOpacity 
                                         onPress={() => this.setState({indexSelectTrip: index})} 
                                         key={item._id}
                                         style={styles.itemTrip}>
                                            <Text style={styles.txtTrip}>{item.name}</Text>
                                            {this.state.indexSelectTrip == index ? (
                                                <MaterialIcons name='radio-button-checked' size={20} color={Colors.mediumseagreen} />
                                            ) : (
                                                <MaterialIcons name='radio-button-unchecked' size={20} color={Colors.gray} />
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                        <View style={styles.viewBtnModal}>
                            <TouchableOpacity
                             onPress={this.onCancelSave}
                             style={[styles.btnModal,{borderRightWidth: 1,borderRightColor: Colors.lavender}]}>
                                <Text style={styles.txtBtnModal}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                             onPress={this.onCreatePlan}
                             style={styles.btnModal}>
                                <Text style={styles.txtBtnModal}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
                            onPress={this.onPressSave}
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
                            {this.state.data?.location && this.state.data?.location.map((item, index) => (
                                <View key={item._id+index}>
                                    <RenderItem
                                        index={index}
                                        title={item.title}
                                        desc={item.desc}
                                        url={item.url}
                                        data={data} />
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

export default connect(
    mapStateToProps,
)(PlanTripScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    mainModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    viewModal: {
        flexDirection: 'column',
        backgroundColor: Colors.white,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: screenWidth/36,
    },
    txtTitleModal: {
        fontSize: 16,
        color: Colors.blackText,
        paddingBottom: screenWidth/36,
        paddingHorizontal: screenWidth/11,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.lavender
    },
    viewItemModal: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    viewBtnModal: {
        flexDirection: 'row',
    },
    txtBtnModal: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.blackText,
        textAlign: 'center',
        paddingVertical: screenWidth/36
    },
    btnModal: {
        flex: 1,
        backgroundColor: Colors.white
    },
    viewBtnModalOption: {

    },
    txtModalOption: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.blackText,
        paddingVertical: screenWidth/27,
        textAlign: 'center'
    },
    mainModalSave: {
        justifyContent: 'center',
    },
    viewModalSave: {
        flexDirection: 'column',
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: screenWidth/36,
    },
    txtTitleModalSave: {
        fontSize: 16,
        color: Colors.blackText,
        paddingHorizontal: screenWidth/11,
        textAlign: 'center',
    },
    input: {
        paddingTop: 0,
        borderBottomWidth: 1,
        borderBottomColor: Colors.blackText,
        fontSize: 15,
        color: Colors.blackText,
    },
    selectTrip: {
        paddingVertical: screenHeight/64,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lavender
    },
    listTrip: {
        marginTop: screenHeight/64,
        maxHeight: screenHeight/5,
    },
    itemTrip: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: screenWidth/72,
        paddingBottom: screenHeight/64
    },
    txtTrip: {
        fontSize: 15,
        color: Colors.blackText,
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
        flex: 1,
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
    viewOptionAndRemove: {
        height: screenWidth / 4.566,
        width: screenWidth/8.8,
        marginRight: 3,
    },
    viewRemove: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewOption: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    option: {
        width: '100%',
        alignItems: 'center',
    },
    txtOption: {
        fontSize: 13,
        color: Colors.blackText
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
    },
    viewTitleAndImage: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
});