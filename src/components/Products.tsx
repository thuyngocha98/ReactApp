import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import ListItem from './ListItem';
import { getTopProducts} from '../actions/action';
import { connect } from 'react-redux';
import Product from '../models/product';

type MyProps = { products: Product[], getProducts: any};
class Places extends Component<MyProps> {

    componentDidMount() {
       this.props.getProducts(5, 33);   
    }

    placesOutput = () => {
        return (
            <FlatList style={styles.listContainer}
                data={this.props.products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={info => (
                    <ListItem
                        placeName={info.item.ten_cay}
                    />
                )}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
              
                <View style={styles.listContainer}>
                    {this.placesOutput()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15
    },
    placeInput: {
        width: '70%',
        padding: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5
    },
    placeButton: {
        width: '30%'
    },
    listContainer: {
        width: '100%',
        marginTop: 15
    }
});

const mapStateToProps = state => {
    return {
        products: state.products.products
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getProducts: getTopProducts
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Places)