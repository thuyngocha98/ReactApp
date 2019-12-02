import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { APPBAR_HEIGHT, screenWidth } from '../../../constants/Dimensions';
import { BASEURL } from '../../../api/api';

function mapStateToProps(state) {
    return {

    };
}

type Props = {
    data?: any[]
}

class Listitem extends Component<Props> {
    render() {
        return (
            <View style={styles.listItem}>
                <ImageBackground source={{ uri: BASEURL + "/" +  this.props.data.image }} style={styles.imageBg}>
                    <View style={{ flex: 3 }} />
                    <View style={{ flex: 2, backgroundColor: Colors.black, opacity: 0.5 }} />
                    <View style={styles.viewText}>
                        <Text numberOfLines={1} style={{ color: Colors.white, fontSize: 14 }}>{this.props.data.title}</Text>
                        <Text numberOfLines={1} style={{ color: Colors.white, fontSize:12 }}>{this.props.data.desc}</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        marginTop: screenWidth/82.2,
        marginLeft: screenWidth/82.2,
        borderTopLeftRadius: screenWidth/82.2,
        borderBottomLeftRadius: screenWidth/82.2,
        borderTopRightRadius: screenWidth/82.2,
        borderBottomRightRadius: screenWidth/82.2,
        overflow: 'hidden',
    },
    imageBg: {
        borderRadius: screenWidth/82.2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: screenWidth / 2 - screenWidth/41.1,
        height: (screenWidth / 2 - screenWidth/41.1) / 1.7684
    },
    viewText: {
        marginHorizontal: screenWidth/82.2,
        paddingBottom: screenWidth/82.2,
        position: 'absolute',
        justifyContent: 'flex-end',
    }

});

export default connect(
    mapStateToProps,
)(Listitem);