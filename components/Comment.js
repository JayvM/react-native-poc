import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Info from './Info';

export default class Comment extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { comment: this.props.comment };
  }

  onVote = (vote) => {
    this.state.comment.votes += vote;
    this.setState({ comment: this.state.comment });
    this.props.onCommentVote(this.state.comment);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>{this.state.comment.content}</Text>
        <Info info={this.state.comment} onVote={this.onVote}></Info>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 8
  },
  content: {
    fontSize: 16
  }
});