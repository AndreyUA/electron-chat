import db from "../db/firestore.js";

export const fetchChats = async () => {
  const response = await db.collection("chats").get();

  return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
