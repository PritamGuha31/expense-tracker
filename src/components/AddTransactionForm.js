import React, {useState, useContext} from "react";
import { GlobalContext } from '../context/GlobalState';

export const AddTransactionForm = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [select, setSelect] = useState('');

    const {dispatch} = useContext(GlobalContext); 

    const onSubmit = e => {
        e.preventDefault();
        // Removing the currently displayed error messages from the UI.
        document.getElementById('form').querySelectorAll('label.error-message').forEach(function(elementObj) {
            elementObj.classList.add('hidden');
        });
        if(performValidations()) {
            const newTransaction = {
                id: Math.floor(Math.random() * 10000000),
                text,
                amount: parseInt(amount * (select == "expense" ? -1 : 1))
            };
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: newTransaction
            })
            setText('');
            setAmount('');
            setSelect('');
        }
        
    }

    // This method performs the mandatory data validations for the input fields.
    const performValidations = () => {
        let flag = true;
        if(text == '') {
            let element = document.getElementById('description');
            element.closest('div').querySelectorAll('label.error-message')[0].classList.remove('hidden');
            flag = false;
        }
        if(select == '' || select == 'select') {
            let element = document.getElementById('transactionType');
            element.closest('div').querySelectorAll('label.error-message')[0].classList.remove('hidden');
            flag = false;
        }
        if(amount == '' || amount == 0) {
            let element = document.getElementById('amount');
            element.closest('div').querySelectorAll('label.error-message')[0].classList.remove('hidden');
            flag = false;
        }
        return flag;
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit} id="form">
                <div className="form-control">
                    <label htmlFor="text">Description</label>
                    <input id="description" type="text" 
                        value={text} onChange={(e) => setText(e.target.value)} 
                        placeholder="Enter description..." />
                    <label className="error-message hidden">Please select Description.</label>
                </div>
                <div className="form-control">
                    <label htmlFor="transaction-type">Transaction Type</label>
                    <select id="transactionType" className={select == "select" || select == "" ? "grey": ""}  
                        value={select} onChange={(e) => setSelect(e.target.value)}>
                        <option value="select">Select Transaction Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <label className="error-message hidden">Please select Transaction Type.</label>
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount </label>
                    <input id="amount" type="number" 
                        value={amount} onChange={(e) => setAmount(e.target.value)} 
                        placeholder="Enter amount..." />
                    <label className="error-message hidden">Please select Amount.</label>
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}