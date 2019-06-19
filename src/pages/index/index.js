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

  componentWillMount() {
    Taro.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']) {
          Taro.getUserInfo({
            success: resu => {
              let userInfo = resu.userInfo
              this.setState({
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl,
                province: userInfo.province,
                city: userInfo.city
              })
              if(this.userInfoReadyCallback) {
                this.userInfoReadyCallback(resu)
              }
            }
          })
        }
      }
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleClick(value) {
    this.setState({
      current: value
    },()=>{
      console.log(this.state.current);
    })
  }

  openTheDrawer() {
    this.setState({
      show: true
    })
  }

  render() {
    return (
      <View className='index'>
        <AtDrawer show={this.state.show} mask width='230px' right='true'>
          <View className='drawer-item'><Text>备忘</Text><AtIcon size='30' color='#363636' value='bell'></AtIcon></View>
          <View className='drawer-item'><Text>Star for me</Text><AtIcon size='30' color='#363636' value='star-2'></AtIcon></View>
          <View className='drawer-item'><Text>About us</Text><AtIcon size='30' color='#363636' value='help'></AtIcon></View>
          <View className='drawer-item'><Text>Exit</Text><AtIcon size='30' color='#363636' value='allow-left'></AtIcon></View>
        </AtDrawer>
        <View className='userInfoContainer'>
          <View className='usersName'><Text>Welcome! {this.state.nickName} </Text></View>
          <View className='usersIcon' onClick={this.openTheDrawer.bind(this)}><AtAvatar circle image={this.state.avatarUrl}></AtAvatar></View>
        </View>
        <AtTabs
          current={this.state.current}
          scroll
          tabList={[
            { title: '星期日' },
            { title: '星期一' },
            { title: '星期二' },
            { title: '星期三' },
            { title: '星期四' },
            { title: '星期五' },
            { title: '星期六' }
          ]}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <View ></View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View ></View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View ></View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <View ></View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={4}>
            <View ></View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={5}>
            <View ></View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={6}>
            <View ></View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
