import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, deleteExpense, updateExpense } from "../util/http";
import LoadingOverLay from "../components/UI/LoadingOverLay";
import ErrorOverLay from "../components/UI/ErrorOverLay";

const ManageExpense = ({ route, navigation }) => {
  const [isManaging, setIsManaging] = useState(false);
  const [error, setError] = useState();

  const editedExpensedId = route.params?.expenseId;
  const isEditing = !!editedExpensedId;
  const { expenses } = useContext(ExpensesContext);
  const selectedExpense = expenses.find(
    (expense) => expense.id == editedExpensedId
  );

  const expenseCtx = useContext(ExpensesContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleExpenseHandler() {
    setIsManaging(true);
    await deleteExpense(editedExpensedId);
    expenseCtx.deleteExpense(editedExpensedId);

    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsManaging(true);
    try {
      if (isEditing) {
        expenseCtx.updateExpense(editedExpensedId, expenseData);
        await updateExpense(editedExpensedId, expenseData);
      } else {
        setIsManaging(true);
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ id, ...expenseData });
      }
      navigation.goBack();
    } catch (error) {
      setError("could not submit  the expenses");
      setIsManaging(false);
    }
  }

  function handleError() {
    setError(null);
  }
  if (error && !isFetching) {
    return <ErrorOverLay message={error} onConfirm={handleError} />;
  }
  if (isManaging) {
    return <LoadingOverLay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={selectedExpense}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
