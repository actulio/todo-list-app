import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Checkbox } from 'react-native-paper';

import Colors from '../constants/Colors';
import * as AsyncStorageHelper from '../utils/asyncStorageHelper';

const TodoItem = (props) => {
  const {
    id, checked, title, description, activeOpacity, navigation
  } = props;

  const [isChecked, setIsChecked] = React.useState(checked);

  React.useEffect(() => {
    setIsChecked(checked);
  }, []);

  const setCompleted = async () => {
    await AsyncStorageHelper.setChecked(id, !isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.itemList}>
      <View>
        <Checkbox
          color={Colors.activeColor}
          uncheckedColor={Colors.textColor}
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={setCompleted}
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
