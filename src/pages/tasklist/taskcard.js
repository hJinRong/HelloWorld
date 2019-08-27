import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { MoreDetails } from './moredetails'
import './taskcard.scss'

export default class TaskCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true
        }
    }

    seeDetails() {
        this.setState({
            visible: true
        })
    }

    render() {
        return (
            <View>
                <View className='taskCard' onClick={this.seeDetails.bind(this)}>
                    <Text>{Taro.getStorageSync(this.props.keysSrc[this.props.keyNum]).title} {Taro.getStorageSync(this.props.keysSrc[this.props.keyNum]).activity} {Taro.getStorageSync(this.props.keysSrc[this.props.keyNum]).deadline}</Text>
                </View>
            </View>
        )
    }
}