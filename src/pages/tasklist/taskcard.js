import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './taskcard.scss'

export default class TaskCard extends Component {

    seeDetails() {
        
    }

    render() {
        return (
            <View className='taskCard' onClick={this.seeDetails.bind(this)}>
                {this.props.title}  {this.props.content} {this.props.deadline}
            </View>
        )
    }
}