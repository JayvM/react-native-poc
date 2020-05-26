import React from 'react';
import { Button, Dimensions, Modal, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

const properties = {
  width: Dimensions.get('window').width / 2,
  height: Dimensions.get('window').height / 2
};

export default class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: null };
  }

  render() {
    let modal = (
      <View style={Platform.OS !== 'web' ? styles.modalMobile : styles.modal}>
        <View style={styles.body}>
          <Text style={styles.message}>{this.props.message}</Text>
          <TextInput style={[styles.input, {height: 100}]} multiline numberOfLines={5} onChangeText={(value) => this.setState({ inputValue: value })}></TextInput>
        </View>
        <View style={styles.buttons}>
          <Button title='Cancel' color='#3CB371' onPress={() => this.props.onClose()}></Button>
          <Button title='Add' color='#3CB371' onPress={() => this.props.onClose(this.state.inputValue)}></Button>
        </View>
      </View>
    );

    if (Platform.OS !== 'web') {
      modal = (
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.modalWrapper}>
            {modal}
          </View>
        </Modal>
      ); 
    }

    return modal;
  }
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalMobile: {
    width: properties.width,
    height: properties.height,
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  modal: {
    width: properties.width,
    height: properties.height,
    padding: 16,
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 999,
    elevation: 999,
    transform: [{ translateX: -(properties.width / 2)}, { translateY: -(properties.height / 2)}],
    backgroundColor: '#FFFFFF'
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
  input: {
    width: '100%',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#000000'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
