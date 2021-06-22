import firebase from "firebase/app";

// DataBase
import db from "../db/firestore.js";

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

export const subscribeToChat = (chatId, onSubscribe) =>
  db
    .collection("chats")
    .doc(chatId)
    .onSnapshot((snapshot) => {
      const chat = { id: snapshot.id, ...snapshot.data() };
      onSubscribe(chat);
    });

export const subscribeToProfile = (userId, onSubscribe) =>
  db
    .collection("profiles")
    .doc(userId)
    .onSnapshot((snapshot) => onSubscribe(snapshot.data()));

export const sendChatMessage = (message, chatId) =>
  db
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .doc(message.timestamp)
    .set(message);

export const subscribeToMessages = (chatId, onSubscribe) =>
  db
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .onSnapshot((snapshot) => onSubscribe(snapshot.docChanges()));
