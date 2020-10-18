import React, {Component} from 'react';
import {StatusBar, View} from "react-native";
import Colors from "../constants/Colors";
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
               <StatusBar barStyle="light-content" hidden={false} backgroundColor={Colors.tintColor} translucent/>
                <MainSearchScreen navigation={this.props.navigation}/>
           </View>
        );
    }
}

export default SearchScreen;
