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
        make:  'string',
        model: 'string',
        miles: {type: 'int', default: 0},
    }
};

const PersonSchema = {
    name: 'Person',
    properties: {
        name:     'string',
        cars:     {type: 'list', objectType: 'Car'},
    }
};

// 根据提供的表初始化 Realm，可同时往数组中放入多个表
let realm = new Realm({schema: [CarSchema,PersonSchema]});

type Props = {};
export default class Apps extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            data: '暂无数据'
        };
    }


    componentWillMount() {
        // Realm.open({schema: [CarSchema, PersonSchema]})
        //     .then(realm => {
        //
        //         // Add persons and their cars
        //         realm.write(() => {
        //             let john = realm.create('Person', {name: 'John', cars: []});
        //             john.cars.push({make: 'Honda',  model: 'Accord', miles: 1500});
        //             john.cars.push({make: 'Toyota', model: 'Prius',  miles: 2780});
        //
        //             let joan = realm.create('Person', {name: 'Joan', cars: []});
        //             joan.cars.push({make: 'Skoda', model: 'Octavia', miles: 1120});
        //             joan.cars.push({make: 'Ford',  model: 'Fiesta',  miles: 95});
        //             joan.cars.push({make: 'VW',    model: 'Golf',    miles: 1270});
        //
        //             let jill = realm.create('Person', {name: 'Jill', cars: []});
        //
        //             let jack = realm.create('Person', {name: 'Jack', cars: []});
        //             jack.cars.push({make: 'Porche', model: '911',    miles: 965});
        //         });
        //
        //         // Find car owners
        //         let carOwners = realm.objects('Person').filtered('cars.@size > 0');
        //         console.log('Car owners')
        //         for (let p of carOwners) {
        //             console.log(`  ${p.name}`);
        //         }
        //
        //         // Find who has been driver longer than average
        //         let average = realm.objects('Car').avg('miles');
        //         let longerThanAverage = realm.objects('Person').filtered('cars.@sum.miles > $0', average);
        //         console.log(`Longer than average (${average})`)
        //         for (let p of longerThanAverage) {
        //             console.log(`  ${p.name}: ${p.cars.sum('miles')}`);
        //         }
        //
        //         realm.close();
        //     });

        let Person = realm.objects('Person');

        if (Person.length) return alert(JSON.stringify(Person));

        realm.write(() => {
            let john = realm.create('Person', {name: 'John', cars: []});
            john.cars.push({make: 'Honda',  model: 'Accord', miles: 1500});
            john.cars.push({make: 'Toyota', model: 'Prius',  miles: 2780});

            let joan = realm.create('Person', {name: 'Joan', cars: []});
            joan.cars.push({make: 'Skoda', model: 'Octavia', miles: 1120});
            joan.cars.push({make: 'Ford',  model: 'Fiesta',  miles: 95});
            joan.cars.push({make: 'VW',    model: 'Golf',    miles: 1270});

            let jill = realm.create('Person', {name: 'Jill', cars: []});

            let jack = realm.create('Person', {name: 'Jack', cars: []});
            jack.cars.push({make: 'Porche', model: '911',    miles: 965});
        });
    }

    componentDidMount() {

        // realm.write(() => {
        //     let john = realm.create('Person', {name: 'John', cars: []});
        //     john.cars.push({make: 'Honda',  model: 'Accord', miles: 1500});
        //     john.cars.push({make: 'Toyota', model: 'Prius',  miles: 2780});
        //
        //     let joan = realm.create('Person', {name: 'Joan', cars: []});
        //     joan.cars.push({make: 'Skoda', model: 'Octavia', miles: 1120});
        //     joan.cars.push({make: 'Ford',  model: 'Fiesta',  miles: 95});
        //     joan.cars.push({make: 'VW',    model: 'Golf',    miles: 1270});
        //
        //     let jill = realm.create('Person', {name: 'Jill', cars: []});
        //
        //     let jack = realm.create('Person', {name: 'Jack', cars: []});
        //     jack.cars.push({make: 'Porche', model: '911',    miles: 965});
        // });

        // Find car owners
        // let carOwners = realm.objects('Person').filtered('cars.@size > 0');
        // console.log('Car owners')
        // for (let p of carOwners) {
        //     console.log(`  ${p.name}`);
        // }
        //
        // // Find who has been driver longer than average
        // let average = realm.objects('Car').avg('miles');
        // let longerThanAverage = realm.objects('Person').filtered('cars.@sum.miles > $0', average);
        // console.log(`Longer than average (${average})`)
        // for (let p of longerThanAverage) {
        //     console.log(`  ${p.name}: ${p.cars.sum('miles')}`);
        // }

    }

    /**
     * 目前没有主键不能更新数据，只能增加数据
     * @returns {*}
     */

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
                    onPress={this.add.bind(this)}
                >
                    <Text>增加数据</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[{marginBottom: 10,}, styles.textStyle]}
                    onPress={this.qurey.bind(this)}
                >
                    <Text>查询数据</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[{marginBottom: 10,}, styles.textStyle]}
                    onPress={this.qureyInfo.bind(this)}
                >
                    <Text>根据条件查询数据</Text>
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

    add() {

        realm.write(() => {
            let john = realm.create('Person', {name: 'John', cars: []});
            john.cars.push({make: 'Honda',  model: 'Accord', miles: 1500});
            john.cars.push({make: 'Toyota', model: 'Prius',  miles: 2780});

            let joan = realm.create('Person', {name: 'Joan', cars: []});
            joan.cars.push({make: 'Skoda', model: 'Octavia', miles: 1120});
            joan.cars.push({make: 'Ford',  model: 'Fiesta',  miles: 95});
            joan.cars.push({make: 'VW',    model: 'Golf',    miles: 1270});

            let jill = realm.create('Person', {name: 'Jill', cars: []});

            let jack = realm.create('Person', {name: 'Jack', cars: []});
            jack.cars.push({make: 'Porche', model: '911',    miles: 965});
        });
    }

    qurey() {
        // 查询所有数据
        let allData = '';

        let carOwners = realm.objects('Person').filtered('cars.@size > 0');

        console.log('Car owners');
        allData += 'Car owners' + '\n';

        for (let p of carOwners) {
            console.log(`  ${p.name}`);
            allData += `  ${p.name}` + '\n'
        }

        allData += '\n';

        let average = realm.objects('Car').avg('miles');
        let longerThanAverage = realm.objects('Person').filtered('cars.@sum.miles > $0', average);

        console.log(`Longer than average (${average})`)
        allData += `Longer than average (${average})` + '\n';

        for (let p of longerThanAverage) {
            console.log(`  ${p.name}: ${p.cars.sum('miles')}`);

            allData += `  ${p.name}: ${p.cars.sum('miles')}`  + '\n'
        }

        let hondas = realm.objects('Car').filtered('make = "Honda"');

        this.setState({
            data:allData
        })
    }

    qureyInfo() {
        let allData = '';

        // 获取Person对象
        let Persons = realm.objects('Person');
        // 设置筛选条件
        let person = Persons.filtered('name == "Joan"');

        if (person) {
            // 遍历表中所有数据
            for (let i = 0; i<person.length; i++) {
                let tempData = '第' + i + '个数据:' + person[i].name + person[i].cars.length + '\n';
                allData += tempData
            }
        }

        this.setState({
            data:'筛选到的数据:' + allData
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
