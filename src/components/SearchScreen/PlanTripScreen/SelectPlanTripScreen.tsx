import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    View,
    TouchableOpacity,
    StyleSheet, 
    Text, 
    StatusBar,
    ActivityIndicator,
    FlatList,
    Dimensions
} from 'react-native';
import Colors from '../../../constants/Colors';
import { APPBAR_HEIGHT, screenWidth } from '../../../constants/Dimensions';
import { Ionicons, Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { BASEURL } from '../../../api/api';
import Modal from 'react-native-modal';

function mapStateToProps(state) {
    return {
      userId: state.dataUser.dataUser._id,
    };
}

type Props = {
    navigation?: any,
    userId?: any
}

type States = {
    data?: any[],
    loading?: boolean,
    modalVisible?: boolean,
    itemDelete?: {
        _id: string,
        name: string,
        code: number
    },
}

class SelectPlanTripScreen extends Component<Props, States> {
    static navigationOptions = {
        header: null
    };

    state = {
        data: [],
        loading: true,
        modalVisible: false,
        itemDelete: {
            _id: "",
            name: "",
            code: -1
        }
    }
    focusListener: any;

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus",() => {
            const code = this.props.navigation.getParam('code', '');
            this.getListTrip(code);
        });
    }

    componentWillUnmount() {
        // remove event listener
        this.focusListener.remove();
    }

    onToggleModal = () => {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    getListTrip = code => {
        this.setState({ loading: true })
        fetch(`${BASEURL}/api/plan/get_plan_by_code/${this.props.userId}/${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        })
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    data: res.data,
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

    onPressDeletePlan = item => {
        this.setState({itemDelete: item})
        this.onToggleModal();
    }

    onDelete = () => {
        this.setState({ loading: true })
        fetch(`${BASEURL}/api/plan/delete_plan/${this.state.itemDelete._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        })
            .then((response) => response.json())
            .then((res) => {
                this.getListTrip(this.state.itemDelete.code);
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
                console.log(error);
            });
        this.onToggleModal();
    }

    render() {
        const data = this.props.navigation.getParam('data', '');
        const code = this.props.navigation.getParam('code', '');
        const title = this.props.navigation.getParam('title', '');
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="transparent" translucent />
                <Modal
                isVisible={this.state.modalVisible}
                style={styles.mainModal}
                coverScreen={false}
                deviceHeight={Dimensions.get('screen').height}
                onBackdropPress={this.onToggleModal}
                >
                    <View style={styles.viewModal}>
                        <Text style={styles.txtTitleModal}>
                            {`Are you sure you want to remove ${this.state.itemDelete.name}?`}
                        </Text>
                        <View style={styles.viewBtnModal}>
                            <TouchableOpacity
                             onPress={this.onToggleModal}
                             style={[styles.btnModal,{borderRightWidth: 1,borderRightColor: Colors.lavender}]}>
                                <Text style={styles.txtBtnModal}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                             onPress={this.onDelete}
                             style={styles.btnModal}>
                                <Text style={styles.txtBtnModal}>OK</Text>
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
                        <View style={styles.headerRight} />
                    </View>
                </View>
                <View style={styles.viewContent}>
                    <Text style={styles.txtRecommend}>Recommendations</Text>
                    <TouchableOpacity
                     onPress={() => this.props.navigation.navigate('PlanTripScreen', {data: data, code: code})}
                     style={styles.viewPlan}>
                        <Text style={styles.txtTitle}>Plan of {title}</Text>
                        <Feather name='chevron-right' size={28} color={Colors.gray} />
                    </TouchableOpacity>
                </View>
                {this.state.loading ? (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator animating size="large" color={Colors.tintColor} />
                    </View>
                ) : (
                    this.state.data.length ?
                    <View style={styles.viewList}>
                        <Text style={styles.txtRecommend}>Your plan</Text>
                        <FlatList 
                         data={this.state.data}
                         renderItem={({item}) => (
                            <TouchableOpacity
                            key={item._id}
                            onPress={() => this.props.navigation.navigate('PlanTripScreen', {
                                data: data, 
                                code: -1, 
                                destination: item.location
                            })}
                            style={styles.viewPlan}>
                                <Text style={styles.txtTitle}>{item.name}</Text>
                                <View style={styles.viewRightItem}>
                                    <TouchableOpacity 
                                     onPress={() => this.onPressDeletePlan(item)}
                                     style={styles.btnDelete}>
                                        <AntDesign name='delete' size={18} color={Colors.gray}/>
                                    </TouchableOpacity>
                                    <Feather name='chevron-right' size={28} color={Colors.gray} />
                                </View>
                            </TouchableOpacity>
                         )}
                         keyExtractor={item => item._id.toString()}
                        />
                    </View>
                    : (null)
                )}
                {!this.state.modalVisible && 
                <TouchableOpacity style={styles.addTrip}
                activeOpacity={0.6}
                onPress={ () => this.props.navigation.navigate('PlanTripScreen', {data: data, code: -1})}
                >
                    <MaterialIcons name={'add'} color={Colors.white} size={36}/>
                </TouchableOpacity>}
            </View>
        );
    }
}

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
        paddingHorizontal: screenWidth/8,
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
        width: screenWidth/12
    },
    viewContent: {
        padding: screenWidth/36,
    },
    viewPlan: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: Colors.lavender
    },
    txtRecommend: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.tintColor
    },
    txtTitle: {
        fontSize: 15,
        color: Colors.blackText
    },
    addTrip: {
        position: 'absolute',
        bottom: screenWidth/18,
        right: screenWidth/24,
        width: screenWidth / 7,
        height: screenWidth / 7,
        borderRadius: screenWidth / 3.5,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: Colors.tintColor
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewList: {
        flex: 1,
        padding: screenWidth/36,
    },
    viewRightItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnDelete: {
        paddingVertical: screenWidth/36,
        paddingHorizontal: screenWidth/24,
    }
});

export default connect(
    mapStateToProps,
)(SelectPlanTripScreen);