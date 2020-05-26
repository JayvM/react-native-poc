import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Comment from './Comment';
import CustomModal from './CustomModal';

export default class PostDetails extends React.Component {  
  constructor(props) {
    super(props);

    this.state = { 
      post: this.props.route.params.post,
      modal: {
        visible: false
      }
    };

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
  }

  openModal = (message) => {
    this.setState({ 
      modal: {
        visible: true,
        message: message
      } 
    });
  };

  closeModal = (inputValue) => {
    this.setState({
      modal: {
        visible: false
      }
    });

    if (inputValue && inputValue !== '') {
      let id;

      do {
        id = Math.floor(Math.random() * (999 - 1 + 1) + 1);
      } while (this.state.post.comments.some(c => c.id === id));

      let comments = Object.assign([], this.state.post.comments);
      comments.push({
        id,
        user: {
          username: 'User0'
        },
        content: inputValue,
        date: new Date(),
        votes: 0
      });
      this.state.post.comments = comments;
      this.setState({ post: this.state.post });
      this.props.route.params.onEdit(this.state.post);
    }
  };

  onCommentVote = (comment) => {
    let index = this.state.post.comments.findIndex(c => c.id === comment.id);
    this.state.post.comments[index] = comment;
    this.setState({ post: this.state.post });
    this.props.route.params.onEdit(this.state.post);
  };

  render() {
    return (
      <View style={styles.wrapper}>
        {this.state.modal.visible && <CustomModal message={this.state.modal.message} onClose={this.closeModal}></CustomModal>}
        <View style={styles.container}>
          <Text style={styles.content}>{this.state.post.content}</Text>
          <FlatList data={this.state.post.comments} extraData={this.state.post.comments} renderItem={({item}) => <Comment comment={item} onCommentVote={this.onCommentVote}></Comment>} keyExtractor={item => item.id.toString()}></FlatList>
          <TouchableOpacity style={styles.button} onPress={() => this.openModal('Add a new comment')}>
            <Icon name='comment-alt' size={20}></Icon>
          </TouchableOpacity>
        </View>
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