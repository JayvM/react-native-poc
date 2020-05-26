import React from 'react';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';

const properties = {
  width: Dimensions.get('window').width / 4,
  height: Dimensions.get('window').height / 4
};

export default function InputsAlert(props) {
  return (
    <View style={styles.alert}>
      <View style={styles.body}>
        <Text style={styles.message}>{props.message}</Text>
      </View>
      <View style={styles.buttons}>
        <Button title='Close' color='#3CB371' onPress={() => props.onClose(false)}></Button>
        <Button title='OK' color='#3CB371' onPress={() => props.onClose(true)}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    width: properties.width,
    height: properties.height,
    padding: 16,
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 999,
    elevation: 999,
    transform: [{ translateX: -(properties.width / 2)}, { translateY: -(properties.height / 2)}],
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333'
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
