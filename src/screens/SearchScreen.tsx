import React, {Component} from 'react';
import {StatusBar, View} from "react-native";
import MainSearchScreen from '../components/SearchScreen/MainSearchScreen/MainSearchScreen';

type Props ={
  navigation? :any
};

class SearchScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
           <View style={{flex: 1}}>
                <MainSearchScreen navigation={this.props.navigation}/>
           </View>
        );
    }
}

export default SearchScreen;
