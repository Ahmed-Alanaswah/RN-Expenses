import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getDateFormatted } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount.toString() || "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description.toString() || "",
      isValid: true,
    },
    date: {
      value: getDateFormatted(defaultValues?.date) || "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert("input invalid", " please check your input value");
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: {
            value: currentInputs.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsValid =
    !inputs.amount.isValid ||
    !inputs.description.isValid ||
    !inputs.date.isValid;

  return (
    <View style={styles.from}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        invalid={!inputs.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsValid && (
        <Text style={styles.errorText}>
          your input is invalid , please check your input
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 8,
    minWidth: 120,
  },
  errorText: {
    margin: 8,
    textAlign: "center",
    color: GlobalStyles.colors.error50,
  },
});
