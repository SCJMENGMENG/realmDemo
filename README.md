# realmDemo
使用realm实现存储 搜索历史记录

不带主键的没有研究

![image](https://github.com/SCJMENGMENG/realmDemo/blob/master/GIF.gif)

![image](https://github.com/SCJMENGMENG/realmDemo/blob/master/realmGIF.gif)

realm install 之后会跑不起来 拷贝realm.zip里的内容 替换 node_module里的realm的内容即可

也可根据情况自行修改 （参考屏幕快照)

```
const PersonSchema = {
    name: 'Person',
    properties: {
        name: 'string',
        testScores: 'double?[]'
    }
};

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
        
        let allData = '';

        let Persons = realm.objects('Person');
        let person = Persons.filtered('name == "Charlie"');
        for (let i = 0; i<person[0].testScores.length; i++) {
            let tempData = '第' + i + '个数据:' + person[0].testScores[i] + '\n';

            allData += tempData;
        }

        alert(allData)
        
        ```
