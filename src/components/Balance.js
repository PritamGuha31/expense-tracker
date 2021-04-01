import React, {useContext} from "react"
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
    const { transactions } = useContext(GlobalContext);
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((total, amount) => (total+amount), 0).toFixed(2);

    return (
        <>
            <h4>Your Balance</h4>
            <h1 className={total > 0 ? "plus" : "minus"}>${total}</h1>
        </>
    );
}