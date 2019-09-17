
import React, {Component} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Places from '../components/Places';


class ActivityScreen extends Component {
    static navigationOptions = {
       header : null
    };
    render() {
        return (
            <ScrollView style={styles.container}>
                <Places />
            </ScrollView>
        );
    }
}

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
