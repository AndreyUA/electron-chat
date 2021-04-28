import db from "../db/firestore.js";

const extractSnapshotData = (snapshot) =>
  snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

export const fetchChats = async () => {
  const response = await db.collection("chats").get();

  return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createChat = (chat) =>
  db
    .collection("chats")
    .add(chat)
    .then((docRef) => docRef.id);
