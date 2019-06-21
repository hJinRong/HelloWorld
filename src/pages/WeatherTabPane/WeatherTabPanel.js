import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabsPane } from 'taro-ui'
import './weatherTabPane.scss'

export default function WeatherTabPanel(props) {
    return (
        <AtTabsPane current={props.current} index={props.index} key={props.key}>
            <View><Text>{props.weatherObject.data.data[props.current].date}</Text></View>
        </AtTabsPane>
    );
}