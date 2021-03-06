import {writeTransaction, readTransactions, applyTransaction} from './utils/transaction';
import fs from 'fs';

let transactions = readTransactions();

// read the initial state
let state = JSON.parse(fs.readFileSync('./database/genesis.json'));
console.log(state.balances)

// now the transactions and initial state were read, 
// time to apply the transactions to get the current state

transactions.forEach(transaction =>{   
  state = applyTransaction(transaction,state);
});

console.log(state.balances)


// write the final state on a json file:

const toDiskstate = JSON.stringify(state);
fs.writeFileSync('./database/currentState.json', toDiskstate);






