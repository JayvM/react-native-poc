import 'react-native-gesture-handler';

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Home from './components/Home';
import PostCreate from './components/PostCreate';
import PostDetails from './components/PostDetails';
import PostEdit from './components/PostEdit';
import Posts from './components/Posts';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen}></Drawer.Screen>
        <Drawer.Screen name="Posts" component={PostsScreen}></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styleOptions = {
  headerStyle: {
    backgroundColor: '#3CB371',
  },
  headerTintColor: '#000000'
};

const options = ({ navigation }) => ({
  headerLeft: () => (
    <Icon style={{marginLeft: 16}} name='bars' size={30} onPress={() => navigation.openDrawer()}></Icon>
  ),
  ...styleOptions
});

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={options}></Stack.Screen>
    </Stack.Navigator>
  );
}

function PostsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Posts' component={Posts} options={options}></Stack.Screen>
      <Stack.Screen name='PostDetails' component={PostDetails} options={styleOptions}></Stack.Screen>
      <Stack.Screen name='PostCreate' component={PostCreate} options={styleOptions}></Stack.Screen>
      <Stack.Screen name='PostEdit' component={PostEdit} options={styleOptions}></Stack.Screen>
    </Stack.Navigator>
  );
}
