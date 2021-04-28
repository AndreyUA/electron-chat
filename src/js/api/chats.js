import firebase from "firebase/app";

// DataBase
import db from "../db/firestore.js";

// const extractSnapshotData = (snapshot) =>
//   snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

export const fetchChats = async () => {
  const response = await db.collection("chats").get();

  return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createChat = (chat) =>
  db
    .collection("chats")
    .add(chat)
    .then((docRef) => docRef.id);

export const joinChat = async (userId, chatId) => {
  const userRef = db.doc(`profiles/${userId}`);
  const chatRef = db.doc(`chats/${chatId}`);

  await userRef.update({
    joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef),
  });

  await chatRef.update({
    joinedUser: firebase.firestore.FieldValue.arrayUnion(userRef),
  });
};
