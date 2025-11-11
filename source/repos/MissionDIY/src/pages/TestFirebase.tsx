import { useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function TestFirebase() {
  useEffect(() => {
    const run = async () => {
      const snap = await getDocs(collection(db, "posts"));
      console.log("Fetched posts:", snap.docs.map(d => d.data()));
    };
    run();
  }, []);

  return <div>Check your console for Firestore data!</div>;
}
