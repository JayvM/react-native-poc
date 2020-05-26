import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Voting extends React.Component {  
  render() {
    return (
      <View style={styles.container}>
        <Icon name='arrow-alt-circle-up' size={20} onPress={() => this.props.onVote(+1)}></Icon>
        <Text style={styles.votes}>{this.props.votes}</Text>
        <Icon name='arrow-alt-circle-down' size={20} onPress={() => this.props.onVote(-1)}></Icon>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  votes: {
    fontSize: 16,
    marginLeft: 4,
    marginRight: 4
  },
});