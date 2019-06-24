import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtInput, AtTextarea, AtForm, AtButton, AtMessage } from 'taro-ui'
import './mynote.scss'
import { set as setGlobalData, get as getGlobalData } from '../global_data'

export default class MyNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleValue: '',
            textAreaValue: '',
            deadline: ''
        }
    }

    componentWillMount() {
        for (let i = 0; i < 5; i++) {
            let emptyVal = 'empty_' + i.toString()
            let emptyOrNot = Taro.getStorageSync(emptyVal)
            if (emptyOrNot === -1) {
                Taro.setStorage({
                    key: 'title_' + i.toString(),
                    data: ''
                })
                Taro.setStorage({
                    key: 'content_' + i.toString(),
                    data: ''
                })
                Taro.setStorage({
                    key: 'deadline_' + i.toString(),
                    data: ''
                })
            }
        }

        let t = getGlobalData('title')
        let c = getGlobalData('content')
        this.setState({
            titleValue: t,
            textAreaValue: c
        })
    }

    onSubmit() {
        /*这里开始要判断是否有空key*/
        let num = function () {
            let i;
            for (i = 0; i < 5; i++) {
                let empty = 'empty_' + i.toString();
                let emptyVal = Taro.getStorageSync(empty)
                if (emptyVal === '-1') {
                    break;
                } else {
                    if (i === 4) {
                        Taro.atMessage({
                            'message': '你所可以存储的备忘已达上限',
                            'type': 'error'
                        })
                    }
                }
            }
            return i;
        }

        let t = this.state.titleValue
        let c = this.state.textAreaValue
        let d = this.state.deadline
        if (t !== '' && c !== '') {
            Taro.setStorage({
                key: 'title_' + num.toString(),
                data: t,
                success: () => {
                    Taro.setStorage({
                        key: 'content_' + num.toString(),
                        data: c,
                        success: () => {
                            Taro.setStorage({
                                key: 'deadline_' + num.toString(),
                                data: d,
                                success: () => {
                                    Taro.setStorage({
                                        key: 'empty_' + num.toString(),
                                        data: '1',
                                        success: () => {
                                            Taro.atMessage({
                                                'message': '保存成功',
                                                'type': 'success'
                                            })
                                        }
                                    })
                                },
                                fail: () => {
                                    Taro.setStorage({
                                        key: 'title_' + num.toString(),
                                        data: ''
                                    })
                                    Taro.setStorage({
                                        key: 'content_' + num.toString(),
                                        data: ''
                                    })
                                    Taro.setStorage({
                                        key: 'deadline_' + num.toString(),
                                        data: ''
                                    })
                                    Taro.setStorage({
                                        key: 'empty_' + num.toString(),
                                        data: '-1'
                                    })
                                    Taro.atMessage({
                                        'message': '保存失败',
                                        'type': 'error'
                                    })
                                }
                            })
                        },
                    })
                }
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

    onDateChange(e) {
        this.setState({
            deadline: e.detail.value
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
                    <Picker mode='date' onChange={this.onDateChange.bind(this)}></Picker>
                    <AtButton formType='submit' type='primary'>Submit</AtButton>
                    <View className='resetBtn'>
                        <AtButton formType='reset' type='secondary'>Reset</AtButton>
                    </View>
                </AtForm>
                <View className='resetAndExit'>
                    <AtButton size='small' onClick={this.saveAndExit.bind(this)}>暂存并退出</AtButton>
                    <AtButton size='small' onClick={this.exitButDoNotSave.bind(this)}>直接退出</AtButton>
                </View>
            </View>
        )
    }
}