import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../firebase";
import { getAuth, signOut } from "@firebase/auth";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    getUsers();
  }, []);

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const Signout = () => {
    const auth = getAuth(app);
    signOut(auth);
  };

  return (
    <div className="App">
      <nav>
        <button onClick={Signout}>Sign out</button>
      </nav>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => setNewAge(e.target.value)}
      />
      <button onClick={createUser}>Create User</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {""}
            <h5>Name: {user.name}</h5>
            <h5>Age: {user.age}</h5>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Change Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
