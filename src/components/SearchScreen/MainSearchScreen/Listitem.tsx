import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native'
import { screenHeight, screenWidth } from '../../../constants/Dimensions';
import Colors from '../../../constants/Colors';
import { BASEURL } from '../../../api/api';


type Props = {
    navigation?: any,
    item?: {
        title?: string,
        desc?: string,
        url?: string,
        resultSearch?: any[]
    }
}

type States = {
    data: any[],
}
// Check platform android set flag animation layout
if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default class ListItems extends PureComponent<Props, States>{
    state= {
        data: this.props.item?.resultSearch ? this.props.item?.resultSearch.slice(0,2) : [],
    }

    onPressMore = () => {
        if(this.props.item.resultSearch.length == this.state.data.length){
            Platform.OS === 'android' &&
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({data: this.props.item?.resultSearch.slice(0,2)})
        }else{
            Platform.OS === 'android' &&
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({data: this.props.item.resultSearch})
        }
    }

    render() {
        const { item } = this.props;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.styleImage}>
                        <Image
                            style={styles.photo}
                            source={{ uri: BASEURL+"/images/main/"+ item.url }}
                        />
                    </View>
                    <View style={styles.container_text}>
                        <Text style={styles.title}>
                            {item.title}
                        </Text>
                        <Text style={styles.description} numberOfLines={2}>
                            {item.desc}
                        </Text>
                    </View>
                </View>
                {item?.resultSearch && (
                   item.resultSearch.length > 0 && (
                   <View style={styles.listSearch}>
                        <FlatList 
                            data={this.state.data}
                            renderItem={({item}) => (
                                <View
                                // onPress={() => this.props.navigation.navigate('SearchDetailScreen', {data: this.props.item, next: item})}
                                style={styles.viewItem}>
                                    <View style={styles.styleImageListSearch}>
                                        <Image
                                            style={styles.photoListSearch}
                                            source={{ uri: BASEURL+"/images/main/"+ item.url }}
                                        />
                                    </View>
                                    <Text numberOfLines={1} style={styles.txtItemSearch}>{item.title}</Text>
                                </View>
                            )}
                            keyExtractor={item => item._id}
                        />
                        {this.props.item?.resultSearch.length - 2 > 0 && (
                        <TouchableOpacity
                        onPress={this.onPressMore}
                        style={styles.viewTouchMore}>
                            <Text style={styles.txtMore}>
                                {this.state.data.length == this.props.item.resultSearch.length ? "Ẩn bớt" : "Xem thêm"}
                            </Text>
                        </TouchableOpacity>
                        )}
                    </View>
                   )
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: screenWidth/24,
        paddingHorizontal: screenWidth / 36,
        paddingTop: screenHeight/56,
        paddingBottom: screenHeight/108,
        backgroundColor: Colors.white,
        marginTop: screenWidth / 36,
        borderRadius: screenWidth / 45,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: screenHeight/108,
    },
    styleImage: {
        borderTopLeftRadius: screenWidth/82.2,
        borderBottomLeftRadius: screenWidth/82.2,
        borderTopRightRadius: screenWidth/82.2,
        borderBottomRightRadius: screenWidth/82.2,
        overflow: 'hidden',
    },
    photo: {
        width: screenWidth/2.74,
        height: screenWidth/4.84,
        resizeMode: 'contain',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: '5%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    title: {
        fontSize: 17,
        color: Colors.black,
        paddingBottom: screenWidth/82.2

    },
    description: {
        fontSize: 14,
        fontStyle: 'italic',
        color: Colors.gray
    },
    listSearch: {
        marginLeft: screenWidth/5.48,
    },
    viewItem: {
        paddingVertical: screenHeight/108,
        borderTopWidth: 1,
        borderTopColor: Colors.lavender,
        flexDirection: 'row',
        alignItems: 'center',
    },
    styleImageListSearch: {
        borderTopLeftRadius: screenWidth/82.2,
        borderBottomLeftRadius: screenWidth/82.2,
        borderTopRightRadius: screenWidth/82.2,
        borderBottomRightRadius: screenWidth/82.2,
        overflow: 'hidden',
    },
    photoListSearch: {
        width: screenWidth/5.48,
        height: screenWidth/9.68,
        resizeMode: 'cover',
    },
    txtItemSearch: {
        flex: 1,
        marginLeft: '5%',
        fontSize: 13,
        color: Colors.gray
    },
    txtMore: {
        textAlign: 'center',
        marginTop: screenHeight/108,
        fontStyle: 'italic',
        fontSize: 13,
        color: "blue"
    },
    viewTouchMore: {
        paddingBottom: screenHeight/108,
    }
});