import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";

async function getStat() {
  const db = getFirestore();
  const docRef = doc(db, "oota/kitchen");
  const docSnap = await getDoc(docRef);
  await setDoc(doc(db, "oota/kitchen"), {
    updates: !docSnap.data().updates,
  });
}

async function foodStat() {
  const db = getFirestore();
  const docRef = doc(db, "foodstatus/D7o26s9vkc66Aw577GlN");
  const docSnap = await getDoc(docRef);
  await setDoc(doc(db, "foodstatus/D7o26s9vkc66Aw577GlN"), {
    updates: !docSnap.data().updates,
  });
}

export { getStat, foodStat };
