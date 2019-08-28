import Taro, { useState } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { set as setGlobalData, get as getGlobalData } from '../global_data'
import CLEAR_NIGHT from './caiyunIcon/CLEAR_NIGHT.png'
import CLEAR_DAY from './caiyunIcon/CLERA_DAY.png'
import HAZE from './caiyunIcon/HAZE.png'
import PARTLY_CLOUDY_DAY from './caiyunIcon/PARTLY_CLOUDY_DAY.png'
import PARTLY_CLOUDY_NIGHT from './caiyunIcon/PARTLY_CLOUDY_NIGHT.png'
import RAIN from './caiyunIcon/RAIN.png'
import SNOW from './caiyunIcon/SNOW.png'
import WIND from './caiyunIcon/WIND.png'
import TC from './caiyunIcon/c.png'
import './index_caiyun.scss'

export default function CaiyunIndex() {

    const [realtime_object, setRealtime_object] = useState(() => {
        let usersLocation
        Taro.getLocation({
            type: 'wgs84',
            success: (res) => {
                const _latitude = res.latitude
                const _longitude = res.longitude
                usersLocation = _longitude.toString() + ',' + _latitude.toString()  //经度在先，纬度在后
                console.log('success to get the location.')

                let hourlyUrl = 'https://api.caiyunapp.com/v2/TAkhjf8d1nlSlspN/' + usersLocation + '/hourly.json'  //小时级预报
                let realtimeUrl = 'https://api.caiyunapp.com/v2/TAkhjf8d1nlSlspN/' + usersLocation + '/realtime.json'  //实时预报

                Taro.request({
                    url: realtimeUrl,
                    header: {
                        'content-type': 'application/json'
                    },
                    success(weather_res) {
                        let realtimeData = weather_res.data
                        console.log(realtimeData)
                        setGlobalData('realtimeData', realtimeData)
                    }
                })
            },
            fail: () => {
                console.log('failed...')
            }
        })
        
        return getGlobalData('realtimeData')['result']
    })

    return (
        <View className='flexContainer'>
            <View className='hts '>
                {
                    {
                        'CLEAR_NIGHT':
                            <Image className='caiyunImage' src={CLEAR_NIGHT}></Image>,
                        'CLEAR_DAY':
                            <Image className='caiyunImage' src={CLEAR_DAY}></Image>,
                        'RAIN':
                            <Image className='caiyunImage' src={RAIN}></Image>,
                        'SNOW':
                            <Image className='caiyunImage' src={SNOW}></Image>,
                        'WIND':
                            <Image className='caiyunImage' src={WIND}></Image>,
                        'HAZE':
                            <Image className='caiyunImage' src={HAZE}></Image>,
                        'PARTLY_CLOUDY_DAY':
                            <Image className='caiyunImage' src={PARTLY_CLOUDY_DAY}></Image>,
                        'PARTLY_CLOUDY_NIGHT':
                            <Image className='caiyunImage' src={PARTLY_CLOUDY_NIGHT}></Image>,
                    }[realtime_object.skycon]
                }

                <Text className='temperature'>{Math.round(realtime_object.temperature)}</Text>
                <Image src={TC} style='width: 40rpx;height: 40rpx;'></Image>
                <Text className='humidity'>{realtime_object.humidity}</Text>
            </View>

            <View className='driveTakeCare'>
                <Text className='dtc'>可见度：{realtime_object.visibility}</Text>
                <Text className='dtc'>风向：{realtime_object.wind.direction}deg 风速：{realtime_object.wind.speed}km/h</Text>
            </View>
            <View className='outdoor'>
                <Text>紫外线系数:{realtime_object.ultraviolet.index}（{realtime_object.ultraviolet.desc}）</Text>
            </View>
            <View className='newTodo'>
                <View className='newTodoBtn'>
                    <AtIcon size='30' color='#363636' value='add-circle'></AtIcon><Text>New Todo</Text>
                </View>
            </View>
        </View>
    )

}