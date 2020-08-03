import React, { Component } from 'react'
import ReactRouletteSlot from '../../component/ReactRouletteSlot';

import './index.less'
interface IProps {}
interface IState {
  // prise: any
}

const data = [
  { id: 1, label: 'AirPods Pro耳机',img: require('../../assets/1.jpeg') },
  { id: 6, label: '大嘴猴文具盒',img: require('../../assets/2.jpeg') },
  { id: 4, label: '学而思定制学霸礼盒',img: require('../../assets/3.jpeg') },
  { id: 5, label: '学而思定制坐垫',img: require('../../assets/4.jpeg') },
  { id: 3, label: '小米智能手环',img: require('../../assets/5.jpeg') },
  { id: 7, label: '学而思经典微课',img: require('../../assets/6.jpeg') },
  { id: 2, label: '阿尔郎智能平衡车',img: require('../../assets/7.jpeg') },
  { id: 8, label: '谢谢参与',img: require('../../assets/LaughingZhu.jpg') },
];
class Gift extends Component<IProps, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
    }
  }

  componentDidMount = () => {
  }

  _initgift = (cb : any) => {
    cb({data: 1})
  }

  alert = () => {
    console.log(111)
  }

  

  render() {
  
    return (

      <div className="gift home flex">
        <div className="gift-container flex">
          <div className="gift-container-content">
            <ReactRouletteSlot
              data={data}
              width={750}
              height={750}
              action={this._initgift}
              alert= {this.alert}
            />
          </div>
        </div>
        
      </div>
    )
  }
}

export default Gift