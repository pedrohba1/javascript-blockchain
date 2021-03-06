import fs from 'fs';

export function writeTransaction(array) {
    fs.writeFileSync('./database/tx.db', JSON.stringify(array));
}

export function readTransactions() {
    const fileContent = fs.readFileSync('./database/tx.db');
    const array = JSON.parse(fileContent);
    return array;
}

export function applyTransaction(transaction, state){
    // check if the transaction is a reward:
    if(transaction.data==='reward'){
        state.balances[transaction.to] += transaction.value;
        return state;
    }
    
    if(transaction.value > state.balances[transaction.from]){
        // it returns the state and the transaction is simply not applied
        return state;
    }

    state.balances[transaction.from] -= transaction.value
    if(state.balances[transaction.to] === undefined){
       state.balances[transaction.to] = 0  
    }
    state.balances[transaction.to] += transaction.value
    return state;
}