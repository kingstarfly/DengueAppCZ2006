import { useState, useEffect } from "react";
import { firebase } from "../firebase/config";

export const useFBGetOne = (setIsLoading) => {
  const [dailyObject, setDailyObject] = useState({});
  const entityRef = firebase.firestore().collection("dailyData");
  useEffect(() => {
    entityRef
      .orderBy("date", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { date, num_cases } = doc.data();
          setDailyObject({ date: date.toDate(), num_cases });
          setIsLoading(false);
        });
      });
  }, []);
  return dailyObject;
};

export const useFBGetAll = () => {
  const [initialAddressObjects, setInitialAddressObjects] = useState([]);

  const entityRef = firebase.firestore().collection("14DayData7");
  useEffect(() => {
    // populate selectedAddresses which is just an array of addresss names only.
    entityRef
      .get()
      .then((querySnapshot) => {
        let objectArray = [];
        querySnapshot.forEach((doc) => {
          // doc represents the addressobject. Has attribute "address" and has a sub-collection "data".
          const address = doc.data().address;
          let dataArray = doc
            .data()
            .data.slice(Math.max(doc.data().data.length - 7, 0));

          objectArray.push({ address: address, dataArray: dataArray });
        });
        setInitialAddressObjects(objectArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return initialAddressObjects;
};
