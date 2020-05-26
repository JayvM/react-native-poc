import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Voting from './Voting';

export default class Info extends React.Component {  
  constructor(props) {
    super(props);
    const info = this.props.info;
    this.state = { info, date: info.date.getDate() + '/' + (info.date.getMonth().toString().length === 1 ? '0' : '') + (info.date.getMonth() + 1) + '/' + info.date.getFullYear() };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>Posted by {this.state.info.user.username} • {this.state.date}</Text>
        <Voting votes={this.state.info.votes} onVote={this.props.onVote}></Voting>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  info: {
    fontSize: 12
  }
});