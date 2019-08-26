import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtDrawer, AtIcon } from 'taro-ui'
import { WeatherTabPanel } from '../WeatherTabPane/WeatherTabPanel'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      current: 0,
      weatherObject: {}
    }
  }

  config = {
    navigationBarTitleText: '今日天气'
  }

  componentWillMount() {
    Taro.request({
      url: 'https://www.tianqiapi.com/api/?version=v9&appid=1001&appsecret=2033',
      data: {
        version: 'v9',
        appid: '1001',
        appsecret: '2033'
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        this.setState({
          weatherObject: res
        })
      },
      fail: () => {
        console.log('fail to request...')
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

  addANote() {
    Taro.navigateTo({
      url: '/pages/mynote/mynote'
    })
  }

  render() {
    const numbers = [...Array(7).keys()]
    const allTabPanel = numbers.map((num) => {
      return (<WeatherTabPanel current={num} index={num} key={num} weatherObject={this.state.weatherObject} weaImg={this.state.weatherObject.data.data[this.state.current].wea_img}></WeatherTabPanel>)
    })

    let tabListItems = []
    for (let index = 0; index < this.state.weatherObject.data.data.length; index++) {
      tabListItems.push({title:this.state.weatherObject.data.data[index].day.split('（')[0]})
    }

    return (
      <View className='index'>
        <AtDrawer show={this.state.show} mask onClose={this.closeTheDrawer.bind(this)} right>
          <View className='drawer-item' onClick={this.addANote.bind(this)}><AtIcon size='30' color='#363636' value='add-circle'></AtIcon><Text>备忘</Text></View>
          <View className='drawer-item'><AtIcon size='30' color='#363636' value='star'></AtIcon><Text>Star for me</Text></View>
          <View className='drawer-item'><AtIcon size='30' color='#363636' value='help'></AtIcon><Text>About us</Text></View>
          <View className='drawer-item'><AtIcon size='30' color='#363636' value='arrow-left'></AtIcon><Text>Exit</Text></View>
        </AtDrawer>
        <View className='userInfoContainer' onClick={this.openTheDrawer.bind(this)}>
          <View className='usersName'><View>Hello, <open-data type='userNickName'></open-data></View></View>
          <View className='usersIcon'><open-data type='userAvatarUrl'></open-data></View>
        </View>
        <AtTabs
          current={this.state.current}
          scroll
          tabList={tabListItems}
          onClick={this.handleClick.bind(this)}
        >
          {allTabPanel}
        </AtTabs>
      </View>
    )
  }
}
