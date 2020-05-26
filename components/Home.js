import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import reactnativelogo from '../images/reactnativelogo.png';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proof of concept</Text>
      <Image style={styles.image} source={reactnativelogo}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    marginBottom: 16
  },
  image: {
    width: 100,
    height: 100
  }
});
