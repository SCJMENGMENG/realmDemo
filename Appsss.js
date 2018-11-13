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
const PersonSchema = {
    name: 'Person',
    properties: {
        name: 'string',
        testScores: 'double?[]'
    }
};

// 根据提供的表初始化 Realm，可同时往数组中放入多个表
let realm = new Realm({schema: [PersonSchema]});

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
                name: 'Charlie',
                testScores: [100.0]
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
        let person = Persons.filtered('name == "Charlie"');
        for (let i = 0; i<person[0].testScores.length; i++) {
            let tempData = '第' + i + '个数据:' + person[0].testScores[i] + '\n';

            allData += tempData;
        }

        alert(allData)
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
