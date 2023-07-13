import { TextInput, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, textInputConfig, invalid }) {
  const inputStyle = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyle.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyle} {...textInputConfig} />
      <Text style={styles.errorText}>{invalid ? "invalid input" : ""}</Text>
    </View>
  );
}

export default Input;
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorText: {
    margin: 8,
    textAlign: "center",
    color: GlobalStyles.colors.error50,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: { backgroundColor: GlobalStyles.colors.error500 },
});
