import React from 'react';
import { Alert, Button, Platform, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import CustomAlert from './CustomAlert';

export default class PostCreate extends React.Component {  
  constructor(props) {
    super(props);

    this.props.navigation.setOptions({ title: 'Create post' });

    this.state = {
      alert: {
        visible: false
      }
    }
  }

  showAlert = (message) => {
    switch (Platform.OS) {
      case 'web': 
        this.setState({ 
          alert: {
            visible: true,
            message: message
          } 
        });
        break;
      case 'android': 
        ToastAndroid.show(message, ToastAndroid.SHORT);
        break;
      case 'ios':
        Alert.alert(message);
        break;
    }
  };

  closeAlert = () => {
    this.setState({
      alert: {
        visible: false
      }
    });
  };

  validate() {
    if (this.state && this.state.title && this.state.content) {
      const post = {
        title: this.state.title,
        content: this.state.content,
        user: {
          username: 'User1'
        },
        date: new Date(),
        votes: 0,
        comments: []
      };

      this.props.route.params.onCreate(post);
      this.props.navigation.goBack();
    } else {
      this.showAlert('Fill in all inputs!');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.alert.visible && <CustomAlert message={this.state.alert.message} onClose={this.closeAlert}></CustomAlert>}
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={(value) => this.setState({title: value})}></TextInput>
        <Text style={styles.label}>Content</Text>
        <TextInput style={[styles.input, styles.multiline]} multiline numberOfLines={5} onChangeText={(value) => this.setState({content: value})}></TextInput>
        <Button title='Finish' color='#3CB371' onPress={() => this.validate()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#DDDDDD'
  },
  label: {
    fontSize: 16,
    marginBottom: 4
  },
  input: {
    fontSize: 16,
    padding: 4,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    textAlignVertical: 'top'
  },
  multiline: {
    height: 100
  }
});