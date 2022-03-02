import { useState, setState } from 'react';
import { doc, collection, onSnapshot, setDoc, getDocs, updateDoc, query, where, getDoc } from 'firebase/firestore';
import { db } from '../backend/Firebase.js'

function UpdateFromTransactions (id, value) {
    const q = query(collection(db, "cities"), where("budget_id", "==", id));
    const querySnapshot = getDocs(q);
    querySnapshot.forEach((doc) => {
        const docRef = doc(db, 'budget', id);
        const docSnap = getDoc(docRef);
        updateDoc(docRef, {
            budget: (docSnap.amount - value)
        });
    })
}

function UpdateFromSetBudget () {
    
}

const [budgetDetails] = useState('')

function SubtractFromBudget (transaction) {
    const id = db.collection('budget').doc(id).get()
    console.log(id)
    const budget = doc(db, 'budget')
    const newTransaction = transaction
    const newBudget = budget - newTransaction
    setDoc(newBudget, {
        budget: newBudget
    });
}