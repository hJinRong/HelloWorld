import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import { AtInput, AtTextarea, AtForm, AtButton, AtMessage } from 'taro-ui'
import './mynote.scss'
import { set as setGlobalData, get as getGlobalData } from '../global_data'

export default class MyNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleValue: '',
            textAreaValue: '',
            deadline: '2019-09-01'
        }
    }

    onSubmit() {
        Taro.setStorage({
            key: new Date().toUTCString(),
            data: {
                title: this.state.titleValue,
                activity: this.state.textAreaValue,
                deadline: this.state.deadline
            }
        })

        Taro.atMessage({
            'message':'保存成功',
            'type':'success'
        })

        Taro.navigateTo({
            url:'/pages/index/index_caiyun'
        })
    }

    onReset() {
        this.setState({
            titleValue: '',
            textAreaValue: '',
            deadline:'2019-09-01'
        })
    }

    titleChange(titleValue) {
        this.setState({
            titleValue
        })
        return titleValue
    }

    textAreaValueChange(e) {
        this.setState({
            textAreaValue: e.target.value
        })
    }

    onDateChange(e) {
        this.setState({
            deadline: e.detail.value
        })
    }

    saveAndExit() {
        let t = setGlobalData('title', this.state.titleValue)
        let c = setGlobalData('content', this.state.textAreaValue)
        let d = setGlobalData('deadline', this.state.deadline)
        if (t === 1 && c === 1 && d === 1) {
            console.log('Submit success!')
            Taro.atMessage({
                'message': '暂存成功，即将退出',
                'type': 'success'
            })
            Taro.navigateTo({
                url: '/pages/index/index_caiyun'
            })
        } else {
            console.log('Failed...')
            Taro.atMessage({
                'message': '暂存失败',
                'type': 'error'
            })
        }
    }

    exitButDoNotSave() {
        Taro.navigateTo({
            url: '/pages/index/index_caiyun'
        })
    }

    goToTaskList() {
        Taro.navigateTo({
            url: '/pages/tasklist/tasklist'
        })
    }


    render() {
        return (
            <View>
                <AtMessage />
                <AtForm onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>
                    <AtInput type='text' name='title' title='Title' value={this.state.titleValue} onChange={this.titleChange.bind(this)} />
                    <AtTextarea value={this.state.textAreaValue} onChange={this.textAreaValueChange.bind(this)} maxLength={300} placeholder='开始记录' />
                    <Picker className='timePicker' mode='date' onChange={this.onDateChange.bind(this)} value={this.state.deadline}><Text>deadline: {this.state.deadline}</Text></Picker>
                    
                    <View className='submitBtn'>
                        <AtButton formType='submit' type='primary'>Submit</AtButton>
                    </View>
                    <View className='resetBtn'>
                        <AtButton formType='reset' type='secondary'>Reset</AtButton>
                    </View>
                </AtForm>
                <View className='resetAndExit'>
                    <AtButton size='small' onClick={this.saveAndExit.bind(this)}>暂存并退出</AtButton>
                    <AtButton size='small' onClick={this.exitButDoNotSave.bind(this)}>直接退出</AtButton>
                </View>
                <AtButton size='normal' type='secondary' onClick={this.goToTaskList.bind(this)}>Go to my task list</AtButton>
            </View>
        )
    }
}