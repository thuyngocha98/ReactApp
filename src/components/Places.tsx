import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList } from 'react-native';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import { addPlace } from '../actions/action';
import Place from '../models/place';
import { string } from 'prop-types';

type Props = { places: Place[], add: any };
type State = { placeName: string};

class Places extends Component<Props, State> { 
    
    state = {
        placeName: ''
    }

   
    placeNameChangeHandler = ( value ) => {
        this.setState({
            placeName: value
        });
    }

    placeSubmitHandler = () => {

        if (this.state.placeName.trim() === '') {
            return;
        }

        console.log(this.state.placeName);
    
        const place = new Place(this.state.placeName);
        this.props.add(place);
    }


    placesOutput = () => {
        const { places } = this.props;  
        return (
            <FlatList style={styles.listContainer}
                data = {places}
                keyExtractor={(item, index) => index.toString()}
                renderItem={info => (
                    <ListItem
                        placeName={info.item.name}
                    />
                )}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder=" Enter name ..."
                        style={styles.placeInput}
                        value={this.state.placeName}
                        onChangeText={this.placeNameChangeHandler}
                    ></TextInput>
                    
                    <Button 
                        title ='Add'                     
                        onPress={this.placeSubmitHandler}
                    ></Button>
                </View>
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
        places: state.places.places
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (place: Place) => {
            dispatch(addPlace(place))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Places)