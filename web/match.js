/**
 * Created by yk on 2016/6/6.
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class Match extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <li>
                <span className="font600">编号</span><span>1258963789</span>
                <span className="match-date font400">2012年12月12日12:12</span>
                <img src="./images/secret.png"/>
                <span className="team">LGD</span>
                <i className="vs">对战</i>
                <span className="team winner">CDECY</span>
                <img src="./images/secret.png"/>
                <a className="match-vedio"
                   href="http://v.youku.com/v_show/id_XMTU4ODY5OTIyMA==.html?from=y1.7-2"><span>视频</span></a>
                <a className="match-replay" href="http://v.youku.com/v_show/id_XMTU4ODY5OTIyMA==.html?from=y1.7-2"><span>下载录像1</span></a>
                <a className="match-replay" href="http://v.youku.com/v_show/id_XMTU4ODY5OTIyMA==.html?from=y1.7-2"><span>下载录像2</span></a>
            </li>
        )
    }
}