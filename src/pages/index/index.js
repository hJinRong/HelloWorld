import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtAvatar, AtDrawer, AtIcon } from 'taro-ui'
import { WeatherTabPanel } from '../WeatherTabPane/WeatherTabPanel'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      current: 0,
      nickName: '',
      avatarUrl: '',
      weatherObject: {}
    }
  }

  config = {
    navigationBarTitleText: '今日天气'
  }

  componentWillMount() {
    Taro.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          Taro.getUserInfo({
            success: resu => {
              let userInfo = resu.userInfo
              this.setState({
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl
              })
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(resu)
              }
            }
          })
        }
      }
    })

    Taro.request({
      url: 'https://route.showapi.com/909-3',  //这个api改一下。
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        this.setState({
          weatherObject: res
        })
      }
    })
  }

  handleClick(value) {
    this.setState({
      current: value
    }, () => {
      console.log(this.state.current);
    })
  }

  openTheDrawer() {
    if (this.state.show != true) {
      this.setState({
        show: true
      }, () => {
        console.log(this.state.show)
      })
    }
  }

  closeTheDrawer() {
    if (this.state.show == true) {
      this.setState({
        show: false
      })
    }
  }

  render() {
    const numbers = [...Array(7).keys()]
    const allTabPanel = numbers.map((num) => {
      return (<WeatherTabPanel current={num} index={num} key={num} weatherObject={this.state.weatherObject}></WeatherTabPanel>)
    })

    return (
      <View className='index'>
        <AtDrawer show={this.state.show} mask onClose={this.closeTheDrawer.bind(this)} right>
          <View className='drawer-item'><Text>备忘</Text><AtIcon size='30' color='#363636' value='bell'></AtIcon></View>
          <View className='drawer-item'><Text>Star for me</Text><AtIcon size='30' color='#363636' value='star-2'></AtIcon></View>
          <View className='drawer-item'><Text>About us</Text><AtIcon size='30' color='#363636' value='help'></AtIcon></View>
          <View className='drawer-item'><Text>Exit</Text><AtIcon size='30' color='#363636' value='allow-left'></AtIcon></View>
        </AtDrawer>
        <View className='userInfoContainer' onClick={this.openTheDrawer.bind(this)}>
          <View className='usersName'><Text>Welcome! {this.state.nickName}</Text></View>
          <View className='usersIcon'><AtAvatar size='large' circle image={this.state.avatarUrl}></AtAvatar></View>
        </View>
        <AtTabs
          current={this.state.current}
          scroll
          tabList={[
            { title: 'Sun' },
            { title: 'Mon' },
            { title: 'Tue' },
            { title: 'Wed' },
            { title: 'Thu' },
            { title: 'Fri' },
            { title: 'Sat' }
          ]}
          onClick={this.handleClick.bind(this)}
        >
          {allTabPanel}
        </AtTabs>
      </View>
    )
  }
}
