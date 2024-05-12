import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, Firestore, doc, updateDoc, deleteDoc, addDoc, query, orderBy, limit, setDoc } from 'firebase/firestore/lite';
import {
  Auth,
  User,
  UserCredential,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Item } from '../interfaces/item';
import { ShipItem } from '../interfaces/ship-item';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDFpc6Vt0zIsgY4Oxbt56ZrVInN9R_cjtw",
  authDomain: "signparadise.firebaseapp.com",
  projectId: "signparadise",
  storageBucket: "signparadise.appspot.com",
  messagingSenderId: "752610914263",
  appId: "1:752610914263:web:021faf2d155fc06efaa592",
  measurementId: "G-GQ7WCD7D5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  auth = getAuth();

  user = new BehaviorSubject<UserCredential | null>(null);
  userObservable = this.user.asObservable();

  constructor(private router: Router) { }


  // Get the list of items from the database
  async getItems() {
    const itemsCol = collection(db, 'items');
    const itemSnapshot = await getDocs(itemsCol);
    const itemList = itemSnapshot.docs.map(doc => doc.data());
    return itemList;
  }

  async getshipItem() {
    const shipCol = collection(db, 'Shipping');
    const shipSnapshot = await getDocs(shipCol);
    const shipList = shipSnapshot.docs.map(doc => doc.data());
    return shipList;
  }


  // Modify an item in the database
  async modifyItem(newItem: Item) {
    try {
      await setDoc(doc(db, "items", newItem.id.toString()), {
        ...newItem
      });
      console.log('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

  async modifyShipping(newItem: ShipItem) {
    try {
      await setDoc(doc(db, "Shipping", newItem.id.toString()), {
        ...newItem
      });
      console.log('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

  // Delete an item from the database
  async deleteItem(itemId: string) {
    const itemDocRef = doc(db, 'items', itemId);
    try {
      await deleteDoc(itemDocRef);
      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  // Upload a new item to the database
  async uploadItem(newItem: Item) {
    try {
      const itemsCol = collection(db, 'items');

      // Get the maximum ID currently used
      const querySnapshot = await getDocs(query(itemsCol, orderBy('id', 'desc'), limit(1)));
      let maxId = 0;
      querySnapshot.forEach((doc) => {
        maxId = doc.data()['id'];
      });

      newItem.id = maxId + 1;

      await setDoc(doc(db, "items", newItem.id.toString()), {
        ...newItem
      });
      console.log('Item uploaded successfully');
    } catch (error) {
      console.error('Error uploading item:', error);
    }
  }


  async uploadShipItem(newItem: ShipItem) {
    try {
      const itemsCol = collection(db, 'Shipping');

      // Get the maximum ID currently used
      const querySnapshot = await getDocs(query(itemsCol, orderBy('id', 'desc'), limit(1)));
      let maxId = 0;
      querySnapshot.forEach((doc) => {
        maxId = doc.data()['id'];
      });

      newItem.id = maxId + 1;

      console.log(newItem.id)

      await setDoc(doc(db, "Shipping", newItem.id.toString()), {
        ...newItem
      });
      console.log('Item uploaded successfully');
    } catch (error) {
      console.error('Error uploading item:', error);
    }
  }

  async signIn(email: string, password: string) {
    console.log("signing in...");
    // sign in
    await signInWithEmailAndPassword(this.auth, email, password)
      .then(
        inputUser => {
          // this.user.next(inputUser);
          this.router.navigateByUrl("/shop");
        })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }


  async signUp(email: string, password: string) {
    if (email.length < 4) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a longer password.');
      return;
    }

    console.log("signing up...");

    // sign up
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then(result => this.router.navigateByUrl("/shop"))
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });

  }


  async signUserOut() {
    try {
      console.log("signing out...");
      await signOut(this.auth);
      // this.user.next(null);
      this.router.navigate(['/login'])
    } catch (error) {
      console.log(error);
    }
  }
}
