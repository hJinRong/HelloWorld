import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtTextarea, AtForm, AtButton, AtMessage } from 'taro-ui'
import './mynote.scss'
import { set as setGlobalData, get as getGlobalData } from '../global_data'

export default class MyNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleValue: '',
            textAreaValue: ''
        }
    }

    componentWillMount() {
        let title = getGlobalData('title')
        let content = getGlobalData('content')
        this.setState({
            titleValue: title,
            textAreaValue: content
        })
    }

    onSubmit() {
        console.log('submit now')
        let t = setGlobalData('title', this.state.titleValue)
        let c = setGlobalData('content', this.state.textAreaValue)
        if (t === 1 && c === 1) {
            console.log('Submit success!')
            Taro.atMessage({
                'message': '保存成功',
                'type': 'success'
            })
        } else {
            console.log('Failed...')
            Taro.atMessage({
                'message': '保存失败',
                'type': 'error'
            })
        }
    }

    onReset() {
        this.setState({
            titleValue: '',
            textAreaValue: ''
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

    saveAndExit() {
        let t = setGlobalData('title', this.state.titleValue)
        let c = setGlobalData('content', this.state.textAreaValue)
        if (t === 1 && c === 1) {
            console.log('Submit success!')
            Taro.atMessage({
                'message': '暂存成功，即将退出',
                'type': 'success'
            })
            Taro.navigateTo({
                url: '/pages/index/index'
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
            url: '/pages/index/index'
        })
    }


    render() {
        return (
            <View>
                <AtMessage />
                <AtForm onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>
                    <AtInput type='text' name='title' title='Title' value={this.state.titleValue} onChange={this.titleChange.bind(this)} />
                    <AtTextarea value={this.state.textAreaValue} onChange={this.textAreaValueChange.bind(this)} maxLength={200} placeholder='开始记录' />
                    <AtButton formType='submit' type='primary'>Submit</AtButton>
                    <AtButton formType='reset' type='secondary'>Reset</AtButton>
                </AtForm>
                <AtButton size='small' onClick={this.saveAndExit.bind(this)}>暂存并退出</AtButton>
                <AtButton size='small' onClick={this.exitButDoNotSave.bind(this)}>直接退出</AtButton>
            </View>
        )
    }
}