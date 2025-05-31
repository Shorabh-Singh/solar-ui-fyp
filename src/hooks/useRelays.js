// src/hooks/useRelays.js
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, update } from "firebase/database";

export function useRelays() {
  const [relays, setRelays] = useState({
    relay1: false,
    relay2: false,
    relay3: false,
    relay4: false
  });

  useEffect(() => {
    const relaysRef = ref(db, "relays");
    const unsubscribe = onValue(relaysRef, (snapshot) => {
      setRelays(snapshot.val() || {});
    });
    return () => unsubscribe();
  }, []);

  // Toggle relay function
  const toggleRelay = (relayKey, value) => {
    update(ref(db, "relays"), { [relayKey]: value });
  };

  // Enable/disable all
  const setAllRelays = (value) => {
    update(ref(db, "relays"), {
      relay1: value,
      relay2: value,
      relay3: value,
      relay4: value
    });
  };

  return { relays, toggleRelay, setAllRelays };
}
