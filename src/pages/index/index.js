import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtAvatar, AtDrawer, AtIcon } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      current: 0,
      nickName: '',
      avatarUrl: '',
      province: '',
      city: ''
    }
  }

  config = {
    navigationBarTitleText: '今日天气'
  }

  componentWillMount() { }

  componentDidMount() {
    Taro.getUserInfo({
      success: function (res) {
        let userInfo = res.userInfo
        let nickName = userInfo.nickName
        let avatarUrl = userInfo.avatarUrl
        let province = userInfo.province
        let city = userInfo.city
        this.setState({
          nickName: nickName,
          avatarUrl: avatarUrl,
          province: province,
          city: city
        })
      }
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <AtDrawer show={this.state.show} mask width='230px' right='true'>
          <View><AtIcon size='20' value='bell'></AtIcon>做个备忘</View>
          <View><AtIcon size='20' value='star-2'></AtIcon>Star for me</View>
          <View><AtIcon size='20' value='help'></AtIcon>About us</View>
          <View><AtIcon size='20' value='allow-left'></AtIcon>Exit</View>
        </AtDrawer>
        
      </View>
    )
  }
}
