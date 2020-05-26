import React from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Picker, Platform, StyleSheet, Switch, Text, TouchableOpacity, View, Alert } from 'react-native';
import { data } from '../data';
import reactnativelogo from '../images/reactnativelogo.png';
import Post from './Post';
import CustomAlert from './CustomAlert';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);

    const options = {
      headerRight: () => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('PostCreate', {
          onCreate: (post) => this.addPost(post)
        })}>
          <Text style={styles.create}>Create</Text>
        </TouchableOpacity>
      ),
      headerRightContainerStyle: {
        marginRight: 16
      }
    };

    this.posts = data;
    this.posts.sort(this.sortByVotes);

    this.state = { 
      alert: {
        visible: false
      },
      imageBackground: false,
      loading: true,
      pickerValue: 'votes',
      posts: this.posts
    };

    setInterval(() => {
      this.props.navigation.setOptions(options);
      this.setState({ loading: false });
    }, 2000);
  }

  showAlert = (message, post) => {
    switch (Platform.OS) {
      case 'web': 
        this.setState({ 
          alert: {
            visible: true,
            message: message,
            postToDelete: post
          } 
        });
        break;
      case 'android': 
      case 'ios':
        Alert.alert(
          '',
          'Are you sure to delete ' + post.title + '?',
          [
            {text: 'Cancel'},
            {text: 'Confirm', onPress: () => this.deletePost(post)},
          ]
        );
        break;
    }
  };

  closeAlert = (confirm) => {
    this.setState({
      alert: {
        visible: false
      }
    });

    if (confirm) {
      this.deletePost(this.state.alert.postToDelete);
    }
  };

  updatePicker = (value) => {
    let posts = Object.assign([], this.state.posts);

    switch (value) {
      case 'votes': 
        posts.sort(this.sortByVotes);
        break;
      case 'date':
        posts.sort(this.sortByDate);
        break;
    }

    this.setState({ 
      pickerValue: value,
      posts: posts
    });
  };

  sortByVotes = (a, b) => {
    if (a.votes < b.votes) return 1;
    if (b.votes < a.votes) return -1;
    return 0;
  };

  sortByDate = (a, b) => {
    if (a.data < b.date) return 1;
    if (b.date < a.date) return -1;
    return 0;
  };

  addPost = (post) => {
    let id;
    
    do {
      id = Math.floor(Math.random() * (999 - 1 + 1) + 1);
    } while (this.state.posts.some(p => p.id === id));

    post.id = id;
    this.state.posts.push(post);
    this.updatePicker(this.state.pickerValue);
  };

  editPost = (post) => {
    let index = this.state.posts.findIndex(p => p.id === post.id);
    this.state.posts[index] = post;
    this.updatePicker(this.state.pickerValue);
  };

  deletePost = (post) => {
    let index = this.state.posts.findIndex(p => p.id === post.id);
    this.state.posts.splice(index, 1);
    this.updatePicker(this.state.pickerValue);
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#3CB371'></ActivityIndicator>
        </View>
      );
    } else {
      const body = (
        <>
          {this.state.alert.visible && <CustomAlert message={this.state.alert.message} onClose={this.closeAlert}></CustomAlert>}
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Sort by </Text>
            <Picker style={styles.picker} itemStyle={styles.pickerItem} selectedValue={this.state.pickerValue} onValueChange={(value, index) => this.updatePicker(value)}>
              <Picker.Item label='votes' value='votes'></Picker.Item>
              <Picker.Item label='date' value='date'></Picker.Item>
            </Picker>
          </View>
          <FlatList data={this.state.posts} extraData={this.state.posts} renderItem={({item}) => <Post navigation={this.props.navigation} post={item} onEdit={this.editPost} showAlert={this.showAlert}></Post>} keyExtractor={item => item.id.toString()}></FlatList>
          <View style={styles.imageBackgroundContainer}>
            <Switch trackColor={{ false: "#FFFFFF", true: "#FFFFFF" }} ios_backgroundColor='#FFFFFF' thumbColor={this.state.imageBackground ? "#3CB371" : "#AAAAAA"} value={this.state.imageBackground} onValueChange={() => this.setState({ imageBackground: !this.state.imageBackground })}></Switch>
            <Text style={[styles.imageBackgroundLabel, this.state.imageBackground ? styles.white : styles.black]}>Image background</Text>
          </View>
        </>
      );

      if (this.state.imageBackground) {
        return (
          <ImageBackground style={styles.imageBackground} source={reactnativelogo}>
            {body}
          </ImageBackground>
        );
      } else {
        return (
          <View style={styles.container}>
            {body}
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  create: {
    fontSize: 18,
    color: '#000000'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageBackground: {
    flex: 1,
    padding: 8,
  },
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#DDDDDD'
  },
  pickerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF'
  },
  pickerLabel: {
    fontSize: 16
  },
  picker: {
    flex: 1,
  },
  pickerItem: {
    height: 60,
    fontSize: 16
  },
  imageBackgroundContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBackgroundLabel: {
    marginLeft: Platform.OS === 'ios' ? 8 : 0
  },
  white: {
    color: '#FFFFFF'
  },
  black: {
    color: '#000000'
  }
});