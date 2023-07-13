import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDAys } from "../util/date";
import { getExpense } from "../util/http";
import LoadingOverLay from "../components/UI/LoadingOverLay";
import ErrorOverLay from "../components/UI/ErrorOverLay";

const RecentExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext);

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDAys(today, 7);

    return expense.date >= date7daysAgo && expense.date <= today;
  });

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expensesData = await getExpense();
        setExpenses(expensesData);
      } catch (error) {
        setError("could not fetch  the expenses");
      }

      setIsFetching(false);
    }
    getExpenses();
  }, []);

  function handleError() {
    setError(null);
  }
  if (error && !isFetching) {
    return <ErrorOverLay message={error} onConfirm={handleError} />;
  }
  if (isFetching) {
    return <LoadingOverLay />;
  }
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="last 7 days"
      fallbackText="no expenses registered for the last 7 days "
    />
  );
};

export default RecentExpenses;
