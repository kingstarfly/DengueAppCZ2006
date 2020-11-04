import axios from "axios";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { Component } from "react";
import { firebase } from "../firebase/config";

export class DengueStats extends Component {
  state = {
    searchText: "",
    isLoading: true,
  };

  queryData = () => {
    this.setState({ isLoading: true });

    axios
      .get("https://data.gov.sg/api/action/package_show?id=dengue-clusters")
      .then((res) => {
        let arr = res.data.result.resources;
        let geojsonlink = arr[1].url;
        let myDate = arr[1].last_modified;
        // myDate is in yyyy-mm-ddThh:mm:ss format.

        // console.log(link1);
        // console.log(link2);
        axios
          .get(geojsonlink)
          .then((res) => {
            let localityAndCaseArr = [];
            res.data.features.forEach((elt) => {
              let longStr = elt.properties.Description;
              let myArr = longStr.split("<");
              let splitAddress = [];
              let caseNumStore = [];
              myArr.forEach((ele, idx) => {
                let re1 = /LOCALITY/;
                let re2 = /CASE_SIZE/;
                if (re1.test(ele)) {
                  let address1 = myArr[idx + 2].slice(3);
                  splitAddress = address1.split("/").map((item) => item.trim());
                }
                if (re2.test(ele)) {
                  caseNumStore.push(myArr[idx + 2].slice(3));
                }
              });
              splitAddress.forEach((add) => {
                localityAndCaseArr.push([add, caseNumStore[0]]);
              });
            });
            // Now, localityAndCaseArr holds many arrays of [loc, num].
            //   console.log(localityAndCaseArr);
            const entityRef = firebase.firestore().collection("14DayData7");

            localityAndCaseArr.forEach((arr) => {
              // check collection if a doc with same id exists
              entityRef.get().then((querySnapshot) => {
                let exists = false;
                querySnapshot.forEach((doc) => {
                  if (doc.id == arr[0]) {
                    exists = true;
                    console.log("Found existing record - ", arr[0]);
                  }
                });

                if (exists) {
                  // if so, then update.
                  entityRef.doc(arr[0]).update({
                    data: firebase.firestore.FieldValue.arrayUnion({
                      date: myDate,
                      // date: "2020-10-30T14:00:00", // for testing update `function
                      // num_cases: (parseInt(arr[1]) + 5).toString(),
                      // num_cases: (
                      //   parseInt(arr[1]) + Math.floor(Math.random() * 10 - 5)
                      // ).toString(),
                      num_cases: arr[1],
                    }),
                  });
                } else {
                  // if not, set new one.
                  entityRef.doc(arr[0]).set({
                    address: arr[0],
                    data: [
                      {
                        date: new Date(myDate).toISOString(),
                        num_cases: arr[1],
                      },
                    ],
                  });
                }
              });
            });

            console.log(myDate);
          })
          .then(console.log("Done with query"));
      });
  };

  createData = () => {
    const entityRef = firebase.firestore().collection("14DayData7");
    entityRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // For each doc, add a new date and num_cases till 12 Nov
        let start = new Date("2020-10-30");
        let end = new Date("2020-11-12");
        let diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
        if (doc.data().data.length > 1) return;
        let num = parseInt(doc.data().data[0].num_cases);

        let choices = [
          0,
          0,
          0,
          0,
          0,
          0,
          -5,
          -4,
          -3,
          -2,
          -2,
          -1,
          -1,
          -1,
          1,
          1,
          1,
          2,
          2,
          3,
          4,
          4,
          5,
          10,
          11,
          15,
        ];

        for (let i = 0; i < diff; i++) {
          let newDate = new Date(start.getTime());
          newDate.setDate(newDate.getDate() + i);

          let indexOfChoice = Math.floor(Math.random() * choices.length);
          num += choices[indexOfChoice]; // randomly add to cumulative num.
          // Ensure num is at least 0
          num = Math.max(0, num);

          entityRef.doc(doc.id).update({
            data: firebase.firestore.FieldValue.arrayUnion({
              date: newDate.toISOString(),
              num_cases: num.toString(),
            }),
          });
        }
      });
      console.log(`Collection has ${querySnapshot.size} documents.`);
    });
  };
  render() {
    return (
      <View>
        <Text> denguestats </Text>
        <Button title="queryData" onPress={this.queryData} />
        <Button title="createData" onPress={this.createData} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DengueStats;
