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
    const { weaImg } = props
    return (
        <AtTabsPane current={props.current} index={props.index} key={props.key}>
            <View className='thisDay'>
                <View className='iconAndTem'>
                    <View className='weatherIcon'>
                        {
                            {
                                'lei': <Image style='width: 100rpx;height: 100rpx;' src={rainy}></Image>,
                                'yun': <Image style='width: 100rpx;height: 100rpx;' src={cloudy}></Image>,
                                'xue': <Image style='width: 100rpx;height: 100rpx;' src={sunny}></Image>,
                                'yin': <Image style='width: 100rpx;height: 100rpx' src={overcast}></Image>
                            }[weaImg]
                        }
                        <Text>{props.weatherObject.data.data[props.current].wea}</Text>
                        <Text>{props.weatherObject.data.data[props.current].tem1} / {props.weatherObject.data.data[props.current].tem2}°C</Text>
                    </View>
                </View>

                {props.weatherObject.data.data[props.current].hours.length === 24
                    ? <View className='hoursContainer'>
                        {[...Array(24).keys()].map((num) => {
                            // eslint-disable-next-line react/jsx-key
                            return (<View className='hoursItem'>
                                <Text>{props.weatherObject.data.data[props.current].hours[num].hours} -- {props.weatherObject.data.data[props.current].hours[num].tem}°C</Text>
                            </View>)
                        })}
                    </View>
                    : <View className='hoursContainer'>
                        {[...Array(8).keys()].map((num) => {
                            // eslint-disable-next-line react/jsx-key
                            return (<View className='hoursItem'>
                                <Text>{props.weatherObject.data.data[props.current].hours[num].hours} -- {props.weatherObject.data.data[props.current].hours[num].tem}°C</Text>
                            </View>)
                        })}
                    </View>}
            </View>

        </AtTabsPane>
    );
}