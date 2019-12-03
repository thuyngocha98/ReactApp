import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, StyleSheet, StatusBar, FlatList } from 'react-native';
import Colors from '../../../constants/Colors';
import { APPBAR_HEIGHT, screenWidth } from '../../../constants/Dimensions';
import { Ionicons } from '@expo/vector-icons';
import ListItemPlanTrip from './ListItemPlanTrip';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    navigation?: any,
}

class PlanTripScreen extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', '')+" Trip Planning",
            headerTitleStyle: {
                textAlign: "center",
                flex: 1,
                color: Colors.white
            },
            headerStyle: {
                elevation: 0,
                height: APPBAR_HEIGHT,
                backgroundColor: Colors.tintColor
            },
            headerRight:
                (
                    <View style={{ marginRight: screenWidth / 27.4 }} >
                    </View>
                ),
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='md-arrow-back' size={30} color={Colors.white} style={{ marginLeft: screenWidth/27.4 }}/>
                </TouchableOpacity>
            )
        }
    };

    render() {
        const plantrip = this.props.navigation.getParam('plantrip', '');
        return (
            <View style={styles.container}>
                <FlatList
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    data={plantrip}
                    removeClippedSubviews={true}
                    renderItem={({ item, index }) => (
                        <ListItemPlanTrip
                            data={item}
                            index={index}
                        />
                    )}
                    keyExtractor={item => item.title.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: screenWidth/20.55,
        flexDirection: 'column',
    },
    

});

export default connect(
    mapStateToProps,
)(PlanTripScreen);