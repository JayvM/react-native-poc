import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Info from './Info';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: this.props.post };
  }

  onVote = (vote) => {
    this.state.post.votes += vote;
    this.setState({ post: this.state.post });
    this.props.onEdit(this.state.post);
  };
  
  render() {
    return (
      <TouchableOpacity 
        style={styles.container} 
        onPress={() => this.props.navigation.navigate('PostDetails', {
          post: this.state.post,
          onEdit: (post) => this.props.onEdit(post)
        })}
        onLongPress={() => this.props.showAlert('Are you sure to delete ' + this.state.post.title + '?', this.state.post)}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.state.post.title}</Text>
          <View style={styles.commentsContainer}>
            <Icon name='comment-alt' size={20}></Icon>
            <Text style={styles.comments}>{this.state.post.comments.length}</Text>
          </View>
        </View>
        <Text style={styles.content}>{this.state.post.content}</Text>
        <Info info={this.state.post} onVote={this.onVote}></Info>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 8,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  comments: {
    fontSize: 16,
    marginLeft: 8
  },
  content: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8
  }
});