import { useState } from "react";
import React from "react";

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const useLocalStorage = (keyName, defaultValue) => {
  const [changedId, setChangedId] = React.useState(uuid());
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  React.useEffect(() => {
    try {
      window.localStorage.setItem(
        keyName,
        JSON.stringify(
          storedValue,
          ((obj) => {
            let cache = [];
            return (key, value) =>
              typeof value === "object" && value !== null
                ? cache.includes(value)
                  ? undefined // Duplicate reference found, discard key
                  : cache.push(value) && value // Store value in our collection
                : value;
          })(),
          2
        )
      );
    } catch (err) {
      console.log(err);
    }
  }, [changedId]);

  return [
    storedValue,
    function setVal(...args) {
      setStoredValue(...args);
      setChangedId(uuid());
    },
    function setNonPersist(...args) {
      setStoredValue(...args);
      console.log("not persisted");
    },
  ];
};
