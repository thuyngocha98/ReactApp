import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import Products from '../components/Products'

export default function ProductsScreen() {
    return (
        <ScrollView style={styles.container}>
            <Products/>
        </ScrollView>
    );
}

ProductsScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
