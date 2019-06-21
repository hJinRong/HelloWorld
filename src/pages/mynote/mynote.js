import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtTextarea, AtForm, AtButton } from 'taro-ui'
import './mynote.scss'

export default class MyNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleValue: '',
            textAreaValue: ''
        }
    }

    onSubmit() {
        console.log('submit now')
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


    render() {
        return (
            <View>
                <AtForm onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>
                    <AtInput type='text' name='title' title='Title' value={this.state.titleValue} onChange={this.titleChange.bind(this)} />
                    <AtTextarea value={this.state.textAreaValue} onChange={this.textAreaValueChange.bind(this)} maxLength={200} placeholder='开始记录' />
                    <AtButton formType='submit'>Submit</AtButton>
                    <AtButton formType='reset'>Reset</AtButton>
                </AtForm>
            </View>
        )
    }
}