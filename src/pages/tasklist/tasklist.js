import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './tasklist.scss'
import TaskCard from './taskcard';


export default class Tasklist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keysObject: [],
        }
    }

    componentWillMount() {
        Taro.getStorageInfo({
            success: (res) => {
                this.setState({
                    keysObject: res.keys
                })
            }
        })
    }

    render() {
        const titleArray = []
        const contentArray = []
        const deadlineArray = []
        const theCopyOfKeysArray = this.state.keysObject
        const arrFilter = [...Array(theCopyOfKeysArray.length).keys()].map((num) => {
            if (theCopyOfKeysArray[num].search(/title_/) !== -1) {
                Taro.getStorage({
                    key: theCopyOfKeysArray[num],
                    success: (res) => {
                        titleArray.push(res)
                    }
                })
            } else if (theCopyOfKeysArray[num].search(/content_/) !== -1) {
                Taro.getStorage({
                    key: theCopyOfKeysArray[num],
                    success: (res) => {
                        contentArray.push(res)
                    }
                })
            } else if (theCopyOfKeysArray[num].search(/deadline_/) !== -1) {
                Taro.getStorage({
                    key: theCopyOfKeysArray[num],
                    success: (res) => {
                        deadlineArray.push(res)
                    }
                })
            }
        })

        const taskCardList = [...Array(titleArray.length).keys()].map((num) => {
            return (<TaskCard title={titleArray[num]} content={contentArray[num]} deadline={deadlineArray[num]} key={num} />)
        })

        return (
            <View>
                {taskCardList}
            </View>
        )
    }
} 