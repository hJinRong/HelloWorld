import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import woman from './woman.jpg'
import './starter.scss'

export default class starter extends Component {

    constructor (props) {
        super(props)
        this.state={
            time:new Date(),        
        }
    }

    componentDidMount() {
        this.setTime=setInterval(
            ()=>this.tick(),
            1000
        )
        this.goToIndex=setTimeout(
            ()=>this.goToIndexPage(),
            3000
        )
        
    }

    componentWillMount() {
        clearInterval(this.setTime);
        clearTimeout(this.goToIndex);
    }

    tick() {
        this.setState({
            time:new Date()
        })
    }

    goToIndexPage() {
        Taro.navigateTo({
            url:'/pages/index/index'
        })
    }

    render () {
        return (
            <View>
                <Image src={woman} mode='widthFix' style='width:100%;height:100%' />
                <View className='starterTextContainer'>
                    <Text>撑阳伞的女人——莫奈</Text>
                    <Text className='starterText'>{this.state.time.toLocaleString()}</Text>
                </View>
            </View>
        )
    }
}