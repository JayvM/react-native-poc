import React from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Comment from './Comment';

export default class PostDetails extends React.Component {  
  constructor(props) {
    super(props);

    this.state = { post: this.props.route.params.post };

    const options = {
      title: this.state.post.title,
      headerRight: () => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('PostEdit', {
          post: this.state.post,
          onEdit: (post) => {
            this.setState({ post });
            this.props.navigation.setOptions({ title: this.state.post.title });
            this.props.route.params.onEdit(post);
          }
        })}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      ),
      headerRightContainerStyle: {
        marginRight: 16
      }
    };

    this.props.navigation.setOptions(options);

    this.state.modalVisible = false;
  }

  onCommentVote = (comment) => {
    let index = this.state.post.comments.findIndex(c => c.id === comment.id);
    this.state.post.comments[index] = comment;
    this.setState({ post: this.state.post });
    this.props.route.params.onEdit(this.state.post);
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.content}>{this.state.post.content}</Text>
          <FlatList data={this.state.post.comments} renderItem={({item}) => <Comment comment={item} onCommentVote={this.onCommentVote}></Comment>} keyExtractor={item => item.id.toString()}></FlatList>
          <TouchableOpacity style={styles.button} onPress={() => this.setState({ modalVisible: true })}>
            <Icon name='comment-alt' size={20}></Icon>
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Add a comment</Text>
              <TextInput style={[styles.input, styles.multiline]} multiline numberOfLines={5} onChangeText={(value) => this.setState({comment: value})}></TextInput>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalButton, { marginRight: 4 }]} onPress={() => this.setState({ modalVisible: false })}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, { marginLeft: 4 }]} onPress={() => {
                  if (this.state.comment && this.state.comment !== '') {
                    let id;

                    do {
                      id = Math.floor(Math.random() * (999 - 1 + 1) + 1);
                    } while (this.state.post.comments.some(c => c.id === id));

                    let post = Object.assign({}, this.state.post);
                    post.comments.push({
                      id,
                      user: {
                        username: 'User0'
                      },
                      content: this.state.comment,
                      date: new Date(),
                      votes: 0
                    });
                    this.setState({ post: this.state.post });
                    this.props.route.params.onEdit(this.state.post);
                  }
                  this.setState({ modalVisible: false });
                }}>
                  <Text style={styles.modalButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  edit: {
    fontSize: 18,
    color: '#000000'
  },
  wrapper: {
    flex: 1
  },
  container: {
    width: '100%',
    flex: 1,
    padding: 8,
    backgroundColor: '#DDDDDD'
  },
  content: {
    fontSize: 16,
    marginBottom: 8
  },
  button: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3CB371',
    borderRadius: 25
  },
  modalWrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '75%',
    height: 'auto',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8
  },
  input: {
    fontSize: 16,
    padding: 4,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    textAlignVertical: 'top'
  },
  multiline: {
    height: 100
  },
  modalButtons: {
    flexDirection: 'row',
  },
  modalButton: {
    flex: 1,
    padding: 8,
    backgroundColor: '#3CB371'
  },
  modalButtonText: {
    fontSize: 16,
    textAlign: 'center'
  }
});