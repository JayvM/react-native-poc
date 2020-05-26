import React from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default class PostEdit extends React.Component {  
  constructor(props) {
    super(props);
    
    this.props.navigation.setOptions({ title: 'Edit post' });
    
    this.state = { post: this.props.route.params.post };
  }

  validate() {
    if (this.state && this.state.title && this.state.content) {
      this.state.post.title = this.state.title;
      this.state.post.content = this.state.content;
      this.props.route.params.onEdit(this.state.post);
      this.props.navigation.goBack();
    } else {
      Alert.alert('Fill in all inputs!');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={(value) => this.setState({title: value})}>{this.state.post.title}</TextInput>
        <Text style={styles.label}>Content</Text>
        <TextInput style={[styles.input, styles.multiline]} multiline numberOfLines={5} onChangeText={(value) => this.setState({content: value})}>{this.state.post.content}</TextInput>
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