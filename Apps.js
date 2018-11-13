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
    primaryKey: 'id',// 官方没给出自增长的办法,而且一般不会用到主键,这也解决了重复访问的问题,而且实际开发中我们不需要主键的,让服务端管就是了
    properties: {
        id: 'int',
        name: 'string',
        tel_number: {type: 'string', default: '156xxxxxxxx'},// 添加默认值的写法
        city: 'string',// 直接赋值的方式设置类型
    }
};

// 根据提供的表初始化 Realm，可同时往数组中放入多个表
let realm = new Realm({schema: [PersonSchema]});

let index = 0;

type Props = {};
export default class Apps extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            data: '暂无数据'
        };
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
                    style={[{marginBottom: 10,}, styles.textStyle]}
                    onPress={this.update.bind(this)}
                >
                    <Text>更新数据</Text>
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
            realm.create('Person', {id:0 + index, name:'阿斯顿', tel_number:'137xxxxxxxx', city:'xx省xx市xxxxxx'});
            realm.create('Person', {id:1 + index, name:'吃点撒', tel_number:'137xxxxxxxx', city:'xx省xx市xxxxxx'});
            realm.create('Person', {id:2 + index, name:'热热的', tel_number:'137xxxxxxxx', city:'xx省xx市xxxxxx'});
            realm.create('Person', {id:3 + index, name:'皮皮虾我们走', tel_number:'137xxxxxxxx', city:'xx省xx市xxxxxx'});
            realm.create('Person', {id:4 + index, name:'自行车', tel_number:'137xxxxxxxx', city:'xx省xx市xxxxxx'});
        })

        index = index + 5
    }

    qurey() {
        // 查询所有数据
        let allData = '';

        // 获取Person对象
        let Persons = realm.objects('Person');

        // 遍历表中所有数据
        for (let i = 0; i<Persons.length; i++) {
            let tempData = '第' + i + '个' + Persons[i].name + Persons[i].tel_number + Persons[i].city + '\n';
            allData += tempData
        }

        this.setState({
            data:allData
        })
    }

    qureyInfo() {
        let allData = '';

        // 获取Person对象
        let Persons = realm.objects('Person');
        // 设置筛选条件
        let person = Persons.filtered('id == 1');

        if (person) {
            // 遍历表中所有数据
            for (let i = 0; i<person.length; i++) {
                let tempData = '第' + (person[i].id + 1) + '个数据:' + person[i].name + person[i].tel_number + person[i].city + '\n';
                allData += tempData
            }
        }

        this.setState({
            data:'筛选到的数据:' + allData
        })
    }

    update() {
        realm.write(() => {
            // 方式一
            realm.create('Person', {id: 0, name: '皮皮虾,我们走', tel_number: '156xxxxxxxx', city: 'xx省xx市xxxxxx'}, true);

            // // 方式二:如果表中没有主键,那么可以通过直接赋值更新对象
            // // 获取Person对象
            // let Persons = realm.objects('Person');
            // // 设置筛选条件
            // let person = Persons.filtered('name == 皮皮虾,我们走');
            // // 更新数据
            // person.name = '黄鳝门'

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
