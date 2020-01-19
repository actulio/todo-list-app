import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Checkbox } from 'react-native-paper';

import Colors from '../constants/Colors';

const TodoItem = (props) => {
  const {
    id, checked, title, description, activeOpacity, navigation
  } = props;
  return (
    <View style={styles.itemList}>
      <View>
        <Checkbox
          color={Colors.activeColor}
          uncheckedColor="white"
          status={checked ? 'checked' : 'unchecked'}
        />
      </View>
      <TouchableOpacity
        style={styles.itemInfo}
        activeOpacity={activeOpacity}
        onPress={() => {
          if (activeOpacity !== 1) {
            navigation.navigate({
              routeName: 'EditTodoScreen',
              params: { id, description, title }
            });
          }
        }}
      >
        <Text style={styles.textTitle}>{title}</Text>
        {description.length
          ? (<Text style={styles.textDetail}>{description}</Text>) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 14,
    paddingTop: 5
  }
});

export default withNavigation(TodoItem);
