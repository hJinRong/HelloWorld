import Taro, { Component } from './node_modules/@tarojs/taroes/@tarojs/taro'
import { View, Text } from './node_modules/@tarojs/componentsrojs/components'
import { AtTabsPane } from './node_modules/taro-uimodules/taro-ui'
import './weatherTabPane.scss'

export default class WeatherTabPane extends Component {
    constructor(props) {
        super(props)
        this.state({
            current:props.current,
            index: props.index,
            key: props.key,
            weatherObject: props.weatherObject
        })
    }

    render() {
        return (
            <AtTabsPane current={this.state.current} index={this.state.index} key={this.state.key}>
                <View className='thisDayWeatherContainer'>
                    <View className='tem'>{this.state.weatherObject.date[this.state.current].tem1}</View>
                </View>
            </AtTabsPane>
        )
    }
}