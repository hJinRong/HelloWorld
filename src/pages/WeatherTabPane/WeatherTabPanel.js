import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTabsPane } from 'taro-ui'
import './weatherTabPane.scss'
import cloudy from './weatherIcon/cloudy.png'
import sunny from './weatherIcon/sunny.png'
import overcast from './weatherIcon/overcast.png'
import rainy from './weatherIcon/rainy.png'
import shower from './weatherIcon/shower.png'
import snow from './weatherIcon/snow.png'
import thundershower from './weatherIcon/thundershower.png'
import fog from './weatherIcon/fog.png'

export default function WeatherTabPanel(props) {
    return (
        <AtTabsPane current={props.current} index={props.index} key={props.key}>
            <View className='thisDay'>
                <View className='weatherIcon'>
                    <Image style='width: 100rpx;height: 100rpx;' src={cloudy}></Image>
                </View>
                <View className='twoTem'>
                    <Text>{props.weatherObject.data.data[props.current].tem1} / {props.weatherObject.data.data[props.current].tem2}</Text>
                </View>
                <View>
                    {props.weatherObject.data.data[props.current].hours.length === 24
                        ? <View className='allHours'>
                            {[...Array(24).keys()].map((num) => {
                                // eslint-disable-next-line react/jsx-key
                                return (<View className='hoursItem'>
                                    <Text>{props.weatherObject.data.data[props.current].hours[num].hours} -- {props.weatherObject.data.data[props.current].hours[num].tem}</Text>
                                </View>)
                            })}
                        </View>
                        : <View className='eightHours'>
                            {[...Array(8).keys()].map((num) => {
                                // eslint-disable-next-line react/jsx-key
                                return (<View className='hoursItem'>
                                    <Text>{props.weatherObject.data.data[props.current].hours[num].hours} -- {props.weatherObject.data.data[props.current].hours[num].tem}</Text>
                                </View>)
                            })}
                        </View>}
                </View>
            </View>

        </AtTabsPane>
    );
}