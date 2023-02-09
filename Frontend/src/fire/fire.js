import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

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

function getUser() {
  const user = JSON.parse(localStorage.getItem("token"));
  return user;
}

function setUser(TNo, set) {
  const db = getFirestore();
  if (set === true) {
    const userName = getUser().name;
    updateDoc(doc(db, "tables/JV5rJ9L66JFo7KSQdagD"), {
      [TNo]: userName,
    });
  } else {
    updateDoc(doc(db, "tables/JV5rJ9L66JFo7KSQdagD"), {
      [TNo]: "",
    });
  }
}

function setFood(TNo, foodItem) {
  const db = getFirestore();
  updateDoc(doc(db, "foodReadyNotification/RI6AKH0u52oLjfiG9XJu"), {
    [TNo]: foodItem,
  });
}

function clearFood(TNo) {
  const db = getFirestore();
  updateDoc(doc(db, "foodReadyNotification/RI6AKH0u52oLjfiG9XJu"), {
    [TNo]: "",
  });
}

export { getStat, foodStat, getUser, setUser, setFood, clearFood };
