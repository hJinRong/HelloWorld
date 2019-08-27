import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './tasklist.scss'
import TaskCard from './taskcard';


export default class Tasklist extends Component {

    render() {
        const keysArr = Taro.getStorageInfoSync().keys

        const taskcardList = [...Array(keysArr.length).keys()].map((num) => {
            return (<TaskCard keyNum={num} keysSrc={keysArr} key={num}></TaskCard>)
        })

        return (
            <View>
                {taskcardList}
            </View>
        )
    }
} 