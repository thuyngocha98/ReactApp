import React , {Component} from 'react';
import { ExpoConfigView } from '@expo/samples';

class AccountScreen extends Component {
    static navigationOptions = {
      header: null
    };
    render() {
        return (
           <ExpoConfigView/>
        );
    }
}

export default AccountScreen;



