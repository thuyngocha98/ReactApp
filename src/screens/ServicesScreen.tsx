import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Places from '../components/Places';

export default function ServicesScreen() {
  return (
    <ScrollView style={styles.container}>    
      <Places />
    </ScrollView>
  );
}

ServicesScreen.navigationOptions = {
  title: 'Services',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
