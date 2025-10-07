import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Colors, Spacing, GlobalStyles } from '../../styles/globalStyles';

const CustomButton = ({
  title,
  onPress,
  loading,
  disabled,
  style,
  textStyle,
}) => (
  <TouchableOpacity
    style={[styles.button, disabled ? styles.disabled : {}, style]}
    onPress={onPress}
    activeOpacity={0.7}
    disabled={disabled || loading}
  >
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...GlobalStyles.shadow,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: Colors.disabled,
    opacity: 0.6,
  },
});

export default CustomButton;
