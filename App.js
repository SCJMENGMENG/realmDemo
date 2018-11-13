/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,Keyboard,TouchableOpacity,Image} from 'react-native';

import FlowLayout from './FlowLayout';

let icon = {
    gabagge: require("./gabagge.png"),
};

const Realm = require('realm');
let realm;
const CarSchema = {
    name: 'Car',
    primaryKey: 'id',
    properties: {
        id: 'int',
        car_name: 'string',
    }
};


type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);

        //初始化Realm
        realm = new Realm({schema: [CarSchema]});

        this.state = {
            modalShow: false,
            isRefresh: false,
            showFoot: 0,
            inputText: '',
            hotWords: ['自驾游', '旅行', '户外', '一日游', '丛林探险', '越野', '爬长城', '水下寻宝'],
            searchHistory: [],
        };
    }


    componentDidMount() {
        this.reloadHistory()
    }

    render() {

        return (
            <View style={{backgroundColor: '#f5f5f5',flex:1}}>

                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="请输入你要找的活动名称"// = android　EditText hint
                        placeholderTextColor="#999"// = hint color
                        underlineColorAndroid='transparent'// 下划线透明
                        clearButtonMode="while-editing"
                        returnKeyType={'search'}
                        returnKeyLabel={'search'}
                        onFocus={() => {
                            this.setState({
                                modalShow: true
                            })
                        }}
                        onSubmitEditing={(event) => {
                            let text = event.nativeEvent.text
                            this.setState({
                                modalShow: false,
                                inputText: text
                            }, () => {
                                this.searchInfo(this.state.inputText)
                            })
                        }}
                    />

                </View>

                <Text style={styles.titleStyle}>热门搜索</Text>

                <FlowLayout style={{marginLeft: 15}} reflectValue={(text)=>{
                    this.searchInfo(text)
                }} multiselect={false} dataValue={this.state.hotWords}/>

                {this.checkHeaderVisible()}

            </View>
        )
    }

    checkHeaderVisible() {
        if (this.state.searchHistory.length > 0) {
            return <View>
                <View
                    style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:17}}>
                    <Text style={styles.titleStyle}>历史搜索</Text>
                    <TouchableOpacity onPress={()=>{
                        realm.write(()=> {
                            let cars = realm.objects('Car');
                            realm.delete(cars);
                            this.reloadHistory()
                        });
                    }}>
                        <Image style={{width:18,height:18,marginRight:15}}
                               source={icon.gabagge}/>
                    </TouchableOpacity>
                </View>

                <FlowLayout reflectValue={(text)=>{
                    this.searchInfo(text)
                }} style={{marginLeft: 15}} ref="flow" multiselect={false}
                            dataValue={this.state.searchHistory}/>
            </View>
        } else {
            return <View>
            </View>
        }
    }

    /**
     * 重新刷新加载搜索历史记录
     */
    reloadHistory() {
        let cars = realm.objects('Car');
        let temp = []

        for (let i = 0; i < cars.length; i++) {
            let car = cars[i];
            temp.push(car.car_name)
        }

        this.setState({
            searchHistory: Array.from(new Set(temp.reverse()))//去重+反转
        })
    }

    /**
     * 查询数据
     * @param keyword
     */
    searchInfo(text) {

        if (text === '') {

            return alert('请输入搜索关键字！')
        }

        if (text.replace(/(^\s*)/g, "") === '') {

            return alert('请输入有效关键字！')
        }

        realm.write(() => {
            realm.create('Car', {id: Date.parse(new Date()), car_name: text}, true);
        })

        this.reloadHistory()

        Keyboard.dismiss()

    }
}

const styles = StyleSheet.create({
    inputStyle: {
        marginLeft: 15,
        borderWidth: 0.5,
        borderRadius: 5,
        marginRight: 15,
        fontSize: 15,
        borderColor: '#999',
        marginTop: 17 + 64,
        paddingLeft: 15,
        marginBottom: 17,
        flex: 1,
        height:50
    },
    titleStyle: {marginLeft: 15, fontSize: 16, color: '#333', fontWeight: 'bold'}
})
