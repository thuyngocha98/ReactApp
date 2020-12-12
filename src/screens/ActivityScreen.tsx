import React, {Component} from 'react';
import MainActivityScreen from "../components/ActivityScreen/RecentActivityScreen/MainActivityScreen";

type Props ={
    navigation?:any
}
class ActivityScreen extends Component<Props> {
    static  navigationOptions = {
      header : null
    };
    render() {

        return (
            <MainActivityScreen
                navigation ={this.props.navigation}
            />
        );
    }
}

export default ActivityScreen;
