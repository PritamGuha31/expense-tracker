import React, {useState, useContext} from "react";
import { GlobalContext } from '../context/GlobalState';

export const AddTransactionForm = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    
    const {dispatch} = useContext(GlobalContext); 

    const onSubmit = e => {
        e.preventDefault();
        const newTransaction = {
            id: Math.floor(Math.random() * 10000000),
            text,
            amount: parseInt(amount)
        };
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: newTransaction
        })
        setText('');
        setAmount(0);
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit} id="form">
                <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} 
                    placeholder="Enter text..." />
                </div>
                <div className="form-control">
                <label htmlFor="amount"
                    >Amount <br />
                    (negative - expense, positive - income)</label
                >
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} 
                    placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}