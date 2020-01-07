import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';

import { Checkbox } from 'react-native-paper';

import Colors from '../constants/Colors';

const mock = [
  {
    done: false,
    title: 'Uma nota',
    detail: 'Apenas informações sobre essa nota'
  },
  {
    done: false,
    title: 'Outra nota',
    detail: ''
  },
  {
    done: true,
    title: 'Mais uma nota, essa longa!11!',
    detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  }
];

const renderListItem = (itemData) => (
  <View style={styles.itemList}>
    <View>
      <Checkbox color="white" />
    </View>
    <View style={styles.itemInfo}>
      <Text style={styles.textTitle}>{itemData.item.title}</Text>
      {itemData.item.detail.length
        ? (<Text style={styles.textDetail}>{itemData.item.detail}</Text>) : null}
    </View>
  </View>
);


const HomeScreen = (props) => {
  const [appLoading, setAppLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  return (
    <View style={styles.container}>

      {/* { appLoading && (
        <ActivityIndicator style={styles.loading} size="large" color={Colors.textColor} animating={appLoading} />
      )}
      { todos.length === 0 && !appLoading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.textColor }}>
            No todos yet.
          </Text>
        </View>
      )} */}
      <FlatList
        data={mock}
        keyExtractor={(item, index) => `item-${index}`}
        renderItem={renderListItem}
      />
      <TouchableOpacity
        style={styles.addTodoButton}
        onPress={() => {
          props.navigation.navigate('NewTodoScreen');
        }}
      >
        <Ionicons name="md-add" size={20} color="black" />
      </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  addTodoButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    elevation: 7,
    bottom: 10,
    right: 12,
    backgroundColor: Colors.activeColor,
  },
  loading: {
    flex: 1,
    alignSelf: 'center'
  },
  itemInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemList: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTitle: {
    color: Colors.textColor,
    fontSize: 18
  },
  textDetail: {
    color: Colors.textColor,
    fontSize: 12
  }
});

export default HomeScreen;
