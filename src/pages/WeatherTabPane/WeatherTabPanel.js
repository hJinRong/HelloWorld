import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTabsPane } from 'taro-ui'
import './weatherTabPanel.scss'
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
        <AtTabsPane current={props.current} index={props.index}>
            <View className='thisDay'>
                <View className='iconAndTem'>
                    <View className='weatherIcon'>
                        {
                            {
                                'lei': <Image style='width: 100rpx;height: 100rpx;' src={thundershower}></Image>,
                                'yu' : <Image style='width: 100rpx;height: 100rpx;' src={rainy}></Image>,
                                'yun': <Image style='width: 100rpx;height: 100rpx;' src={cloudy}></Image>,
                                'xue': <Image style='width: 100rpx;height: 100rpx;' src={sunny}></Image>,
                                'yin': <Image style='width: 100rpx;height: 100rpx;' src={overcast}></Image>
                            }[weaImg]
                        }
                        <Text style='padding-left:1em; font-sizing: 40rpx;'>{props.weatherObject.data.data[props.current].wea}</Text>
                    </View>
                    <View className='weatherTem'>
                        <Text>{props.weatherObject.data.data[props.current].tem1} / {props.weatherObject.data.data[props.current].tem2}°C</Text>
                    </View>
                </View>

                {props.weatherObject.data.data[props.current].hours.length === 24
                    ? <View className='hoursContainer'>
                        {[...Array(24).keys()].map((num) => {
                            // eslint-disable-next-line react/jsx-key
                            return (<View className='hoursItem' key={num}>
                                <Text>{props.weatherObject.data.data[props.current].hours[num].hours} -- {props.weatherObject.data.data[props.current].hours[num].tem}°C</Text>
                            </View>)
                        })}
                    </View>
                    : <View className='hoursContainer'>
                        {[...Array(8).keys()].map((num) => {
                            // eslint-disable-next-line react/jsx-key
                            return (<View className='hoursItem' key={num}>
                                <Text>{props.weatherObject.data.data[props.current].hours[num].hours} -- {props.weatherObject.data.data[props.current].hours[num].tem}°C</Text>
                            </View>)
                        })}
                    </View>}
            </View>

        </AtTabsPane>
    );
}