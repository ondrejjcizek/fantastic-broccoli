import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import './Expenses.css';
import ExpensesFilter from "./ExpenseFilter";
import { useState } from "react";

function Expenses(props) {
    const [filteredYear, setFilteredYear] = useState('2020');

    const filterChangedHandler = selectedYear => {
        setFilteredYear(selectedYear);
    };

    return (
        <div>
            <Card className="expenses">
                <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangedHandler}/>
                {props.items.map((expense) => (
                    <ExpenseItem 
                        title={expense.title}
                        amount={expense.amount}
                        date={expense.date}
                    />
                ))}
            </Card>
        </div>
    );
}

export default Expenses;