/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, Image,ScrollView} from 'react-native';

const Realm = require('realm');

// 新建表模型
const CarSchema = {
    name: 'Car',
    properties: {
        speed: 'int',
        seat: 'string[]',
    }
}

const PersonSchema = {
    name: 'Person',
    properties: {
        id:'int',
        name: 'string',
        testScores: 'double?[]',
        carData: {type: 'list',objectType:'Car'}
    }
};

// 根据提供的表初始化 Realm，可同时往数组中放入多个表
let realm = new Realm({schema: [CarSchema,PersonSchema]});

type Props = {};
export default class Appsss extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            data: '暂无数据'
        };
    }


    componentWillMount() {
        let Person = realm.objects('Person');

        if (Person.length) return alert(JSON.stringify(Person));

        realm.write(() => {
            let charlie = realm.create('Person', {
                id:0,
                name: 'Charlie',
                testScores: [100.0,21],
                carData:[]
            });

            // Charlie had an excused absense for the second test and was allowed to skip it
            charlie.testScores.push(null);

            // And then he didn't do so well on the third test
            charlie.testScores.push(70.0);
        });

    }

    componentDidMount() {
    }

    render() {

        return (
            <View style={{
                backgroundColor: '#f5f5f5',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <ScrollView>
                    <Text
                        style={{
                            marginTop: 100,

                        }}
                        numberOfLines={0}
                    >{this.state.data}</Text>
                </ScrollView>
                <TouchableOpacity
                    style={[{marginTop: 60,marginBottom: 10}, styles.textStyle]}
                    onPress={this.look.bind(this)}
                >
                    <Text>查看数据</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[{marginBottom: 10}, styles.textStyle]}
                    onPress={this.update.bind(this)}
                >
                    <Text>修改数据</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[{marginBottom: 60,}, styles.textStyle]}
                    onPress={this.delete.bind(this)}
                >
                    <Text>删除数据</Text>
                </TouchableOpacity>
            </View>
        )
    }

    look() {

        let allData = '';

        let Persons = realm.objects('Person');
        let person = Persons.filtered('id == 0');
        // let person = Persons.filtered('name == "Charlie"');
        for (let i = 0; i<person[0].testScores.length; i++) {
            let tempData = '第' + i + '个数据:' + person[0].testScores[i] + '\n';

            allData += tempData;
        }

        alert(allData)
    }

    update() {

        realm.write(() => {

            realm.create('Person',{
                id:0,
                name:'Jon',
                testScores:[102.00,21,666,888],
                carData:[
                    {speed: 60, seat:['大的','小的','多处']},
                    {speed: 90, seat:['大的1','小的1','多处1']},
                    {speed: 120, seat:['大的2','小的2','多处3']}
                ]
            })
        })
    }

    delete() {
        realm.write(() => {
            // 获取Person对象
            let Persons = realm.objects('Person');
            // 删除
            realm.delete(Persons);
        })
    }
}

const styles = StyleSheet.create({

    textStyle: {
        height: 30,
        backgroundColor: 'yellow',
        justifyContent: 'center',
    }
});
