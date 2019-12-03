import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { screenWidth } from '../../../constants/Dimensions';
import { data } from '../MainSearchScreen/dataListitem';
import { BASEURL } from '../../../api/api';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    data?: any[],
    index?: number
}

class ListItemPlanTrip extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <View>{this.props.data.timemove == "1" ? (
                    null
                ) : (
                        <View style={styles.header}>
                            <View style={styles.vehicle}>
                                <View style={{ width: screenWidth / 15.8, height: screenWidth / 15.8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <Ionicons name="md-car" size={20} />
                                </View>
                                <View style={{ width: screenWidth / 15.8, height: 15, flexDirection: 'column', alignItems: 'center', }}>
                                    <View style={{ width: 1, height: screenWidth / 27.4, backgroundColor: Colors.lightgray }} />
                                </View>
                            </View>
                            <View style={styles.timeMove}>
                                <Text style={styles.textTimeMove}>{this.props.data.timemove}</Text>
                            </View>
                        </View>
                )}
                    
                </View>
                
                <View style={styles.body}>
                    <View style={styles.numberAndLine}>
                        <View style={styles.number}>
                            <Text style={styles.txtNumber}>{this.props.index}</Text>
                        </View>
                        <View style={{ width: screenWidth / 15.8, height: screenWidth / 5.1375, flexDirection: 'column', alignItems: 'center', }}>
                            <View style={{ width: 1, height: screenWidth / 5.1375, backgroundColor: Colors.lightgray }} />
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleAndDesc}>
                            <View style={styles.title}>
                                <Text numberOfLines={1} style={styles.txtTitle}>{this.props.data.title}</Text>
                            </View>
                            <View style={styles.desc}>
                                <Text numberOfLines={4} style={styles.txtDesc}>{this.props.data.desc}</Text>
                            </View>
                        </View>
                        <View style={styles.viewImage}>
                            <Image
                                style={styles.Image}
                                source={{ uri: BASEURL + "/" + this.props.data.image }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: screenWidth / 20.55,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
    },
    vehicle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    timeMove: {
        flex: 7,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    textTimeMove: {
        marginTop: screenWidth / 137,
        fontSize: 15,
        color: Colors.gray
    },
    body: {
        flexDirection: 'row',
    },
    numberAndLine: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    number: {
        width: screenWidth / 15.8,
        height: screenWidth / 15.8,
        borderWidth: 2,
        borderRadius: screenWidth / 31.6,
        borderColor: Colors.tintColor,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtNumber: {
        fontSize: 16,
        color: Colors.tintColor
    },
    content: {
        flex: 7,
        flexDirection: 'row',
    },
    titleAndDesc: {
        flex: 3.5,
        flexDirection: 'column',
        marginRight: screenWidth / 41.1,
    },
    viewImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Image: {
        width: screenWidth / 6.04,
        height: screenWidth / 4.566,
        borderRadius: 8,
    },
    title: {

    },
    txtTitle: {
        fontSize: 17,
        color: Colors.black,
    },
    desc: {

    },
    txtDesc: {
        fontSize: 14,
        color: Colors.gray,
    }

});

export default connect(
    mapStateToProps,
)(ListItemPlanTrip);