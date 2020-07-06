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
import { withFormik, useFormik } from 'formik';

import Colors from '../constants/Colors';
import TodoContext from '../contexts/todoContext';
import { CREATE_TODO } from '../contexts/todoReducer';

const ErrorText = ({ errorMessage }) => (
  <View>
    <Text style={{ color: 'red' }}>
      {errorMessage}
    </Text>
  </View>
);

const NewTodoScreen = (props) => {
  const context = React.useContext(TodoContext);

  const formik = useFormik({
    initialValues: {
      checked: false,
      title: '',
      description: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = 'The title is required!';
      }
      return errors;
    },
    onSubmit: async (values) => {
      context.dispatch(CREATE_TODO, values);
      props.navigation.goBack();
      // setSubmitting(false);
    }
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  } = formik;


  const [isFocused, setIsFocused] = React.useState({
    title: false,
    description: false
  });

  const textAreaRef = React.useRef(null);

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
        autoFocus
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
        <Ionicons name="md-add" size={20} color="black" />
      </TouchableOpacity>

    </View>
  );
};

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
});


// const NewTodoScreen = withFormik({
//   mapPropsToValues: () => ({
//     checked: false,
//     title: '',
//     description: ''
//   }),
//   validate: (values) => {
//     const errors = {};
//     if (!values.title) {
//       errors.title = 'The title is required!';
//     }
//     return errors;
//   },
//   handleSubmit: async (values, { props }) => {
//     await AsyncStorageHelper.create(values);
//     props.navigation.goBack();
//     // setSubmitting(false);
//   }
// })(InnerForm);

export default NewTodoScreen;
