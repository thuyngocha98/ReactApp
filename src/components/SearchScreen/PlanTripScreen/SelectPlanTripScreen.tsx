import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    View,
    TouchableOpacity,
    StyleSheet, Text, 
    StatusBar,
} from 'react-native';
import Colors from '../../../constants/Colors';
import { APPBAR_HEIGHT, screenWidth } from '../../../constants/Dimensions';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}

class SelectPlanTripScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    render() {
        const data = this.props.navigation.getParam('data', '');
        const code = this.props.navigation.getParam('code', '');
        const title = this.props.navigation.getParam('title', '');
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
                <TouchableOpacity style={styles.addTrip}
                 activeOpacity={0.6}
                 onPress={ () => this.props.navigation.navigate('PlanTripScreen', {data: data, code: -1})}
                >
                    <MaterialIcons name={'add'} color={Colors.white} size={36}/>
                </TouchableOpacity>
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
        width: screenWidth/12
    },
    viewContent: {
        padding: screenWidth/36,
    },
    viewPlan: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: screenWidth/36,
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
    }
});

export default connect(
    mapStateToProps,
)(SelectPlanTripScreen);