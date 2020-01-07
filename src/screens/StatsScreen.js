import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatsScreen = () => (
  <View style={styles.container}>
    <Text>This is the stats screen!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030'
  }
});

export default StatsScreen;
