import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { MoreDetails } from './moredetails'
import './taskcard.scss'

export default class TaskCard extends Component {
    constructor(props) {
        super(props)
        this.state={
            visible:false
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
                {this.props.title}  {this.props.content} {this.props.deadline}
            </View>
            {this.state.visible && <MoreDetails title={this.props.title} content={this.props.content} deadline={this.prop.deadline} />}
            </View>
        )
    }
}