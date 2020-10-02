import axios from 'axios';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { Component } from 'react'

export class DengueStats extends Component {

    state = {
        searchText: "",
        isLoading: true,
    }

    queryData = () => {
        this.setState({isLoading: true});

        axios.get("https://data.gov.sg/api/action/package_show?id=dengue-clusters").then(res=>{
            let arr = res.data.result.resources;
            let link1 = arr[0].url;
            let link2 = arr[1].url;
            console.log(link1);
            console.log(link2);
            axios.get(link2).then(geojson=>{
                let arr2 = geojson.data.features;
                let str = arr2[0].properties.Description;
                let myArr = str.split("<");
                let cleanedArr = [];
                myArr.forEach((ele, idx) => {
                    let re1 = /LOCALITY/;
                    let re2 = /CASE_SIZE/;
                    if (re1.test(ele)) {
                        cleanedArr.push(myArr[idx+2]);
                    }

                    if (re2.test(ele)) {
                        cleanedArr.push(myArr[idx+2]);
                    }

                })
                console.log(cleanedArr);
            })
        })

    }

    render() {
        return (
            <View>
                <Text> denguestats </Text>
                <Button title="queryData" onPress={this.queryData}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default DengueStats
