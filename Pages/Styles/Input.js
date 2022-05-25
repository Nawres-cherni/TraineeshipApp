import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const Input = ({
  label,
  
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? 'red'
              : isFocused
              ? '#7978B5'
              : '#F3F4FB',
            alignItems: 'center',
          },
        ]}>
      
      <TextInput
      autoFocus={true}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
  
          {...props}
        />
      </View>
      {error && (
        <Text style={{marginTop: 7, color: 'red', fontSize: 12,marginStart:15}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    marginTop:10,
    width: 330,
    height:40,
    marginLeft:5,
    borderRadius: 35,
    fontSize:16,
    backgroundColor:'#dfe4ea',
  
    
   // marginBottom:-10
    //borderColor:'#000',
    borderWidth: 0.5,
  },
});

export default Input;