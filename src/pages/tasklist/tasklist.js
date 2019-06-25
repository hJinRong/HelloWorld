import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './tasklist.scss'
import TaskCard from './taskcard';
import { set as setGlobalData, get as getGlobalData } from '../global_data'

export default class Tasklist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keysObject: {},
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
        return (
            <View>
                <TaskCard title={this.state.keysObject.title_1} content={this.state.keysObject.content_1} deadline={this.state.keysObject.deadline_1}></TaskCard>
                <TaskCard title={this.state.keysObject.title_2} content={this.state.keysObject.content_2} deadline={this.state.keysObject.deadline_2}></TaskCard>
                <TaskCard title={this.state.keysObject.title_3} content={this.state.keysObject.content_3} deadline={this.state.keysObject.deadline_3}></TaskCard>
                <TaskCard title={this.state.keysObject.title_4} content={this.state.keysObject.content_4} deadline={this.state.keysObject.deadline_4}></TaskCard>
                <TaskCard title={this.state.keysObject.title_5} content={this.state.keysObject.content_5} deadline={this.state.keysObject.deadline_5}></TaskCard>
            </View>
        )
    }
} 