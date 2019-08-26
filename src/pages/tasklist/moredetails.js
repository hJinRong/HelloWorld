import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './moredetails.scss'

export default function MoreDetails(props) {
    return (
        <View className='taskCardContainer'>
            <View className='titlePart'>{props.title}</View>
            <View className='temPart'></View>
            <View className='contentPart'><Text>{props.content}</Text><View className='doneButton'>Done</View></View>
            <View className='deadlinePart'>{props.deadline}</View>
        </View>
    )
}