import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { withFormik } from 'formik';

import Colors from '../constants/Colors';
import { EDIT_TODO, REMOVE_TODO } from '../contexts/todoReducer';

const ErrorText = ({ errorMessage }) => (
  <View>
    <Text style={{ color: Colors.errorColor }}>
      {errorMessage}
    </Text>
  </View>
);

const InnerForm = (props) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    navigation
  } = props;

  const [isFocused, setIsFocused] = React.useState({
    title: false,
    description: false
  });
  const textAreaRef = React.useRef(null);

  React.useEffect(() => {
    values.checked = navigation.getParam('checked');
    values.title = navigation.getParam('title');
    values.description = navigation.getParam('description');
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.title,
          isFocused.title
            ? { borderBottomColor: Colors.activeColor }
            : { borderBottomColor: Colors.lightGray }
        ]}
        autoCapitalize="sentences"
        placeholder="What needs to be done?"
        placeholderTextColor={Colors.lightGray}
        value={values.title}
        onChangeText={handleChange('title')}
        maxLength={35}
        returnKeyType="next"
        onSubmitEditing={() => textAreaRef.current.focus()}
        onBlur={() => {
          setIsFocused((prevState) => ({ ...prevState, title: false }));
          handleBlur('title');
        }}
        onFocus={() => {
          setIsFocused((prevState) => ({ ...prevState, title: true }));
        }}
      />

      {errors.title && touched.title ? (
        <ErrorText errorMessage={errors.title} />
      ) : null}

      <View style={[
        styles.textAreaContainer,
        isFocused.description
          ? { borderBottomColor: Colors.activeColor }
          : { borderBottomColor: Colors.lightGray }
      ]}
      >
        <TextInput
          style={styles.description}
          autoCapitalize="none"
          placeholder="Adicional Notes..."
          placeholderTextColor={Colors.lightGray}
          underlineColorAndroid="transparent"
          multiline
          numberOfLines={10}
          value={values.description}
          ref={textAreaRef}
          onChangeText={handleChange('description')}
          onBlur={() => {
            setIsFocused((prevState) => ({ ...prevState, description: false }));
            handleBlur('description');
          }}
          onFocus={() => {
            setIsFocused((prevState) => ({ ...prevState, description: true }));
          }}
        />
      </View>

      <TouchableOpacity style={styles.addTodoButton} onPress={handleSubmit}>
        <Ionicons name="md-checkmark" size={20} color="black" />
      </TouchableOpacity>

    </View>
  );
};

const EditScreen = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    checked: false,
    title: '',
    description: ''
  }),
  validate: (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'The title is required!';
    }
    return errors;
  },
  handleSubmit: async (values, { props }) => {
    const id = props.navigation.getParam('id');
    const dispatch = props.navigation.getParam('dispatch');
    dispatch(EDIT_TODO, {
      id,
      ...values,
    });
    props.navigation.goBack();
  }
})(InnerForm);

EditScreen.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <View style={styles.menu}>
      <TouchableOpacity
        style={styles.menu}
        onPress={() => {
          const dispatch = navigation.getParam('dispatch');
          dispatch(
            REMOVE_TODO,
            { id: navigation.getParam('id') }
          );
          navigation.goBack();
        }}
      >
        <Ionicons name="md-trash" size={28} color={Colors.textColor} />
      </TouchableOpacity>
    </View>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 15
  },
  title: {
    fontSize: 20,
    color: Colors.textColor,
    borderColor: 'transparent',
    borderBottomColor: Colors.lightGray,
    borderWidth: 1,
    marginTop: 20,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: Colors.lightGray,
    marginTop: 20,
  },
  description: {
    height: 200,
    textAlignVertical: 'top',
    fontSize: 15,
    color: Colors.textColor,
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
  headerButtons: {
    flexDirection: 'row'
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  }
});

export default EditScreen;
