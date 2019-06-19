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
        if (res.authSetting['scope.userInfo']) {
          Taro.getUserInfo({
            success: resu => {
              let userInfo = resu.userInfo
              this.setState({
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl,
                province: userInfo.province,
                city: userInfo.city
              })
              if (this.userInfoReadyCallback) {
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
    }, () => {
      console.log(this.state.current);
    })
  }

  openTheDrawer() {
    if (this.state.show != true) {
      this.setState({
        show: true
      },() => {
        console.log(this.state.show)
      })
    }
  }

  closeTheDrawer() {
    if(this.state.show == true) {
      this.setState({
        show: false
      })
    }
  }

  render() {
    return (
      <View className='index'>
        <AtDrawer show={this.state.show} mask width='230px' right='true' onClose={this.closeTheDrawer.bind(this)}>
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
