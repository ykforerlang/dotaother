/**
 * Created by yk on 2016/6/6.
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class LeagueIntro extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="intro clear">
                <h3 className="title"><i className="jiangbei"></i><span>joinDOTA联赛第3赛季</span></h3>
                <img className="fl" src="http://picture.show.173.com/artshow/artshow_180001810"/>
                <label className="fl live">免费看</label>
                <label className="fr">1000,000$</label>
                <span className="fr">Killing Spree。Killing Spree是长期的战战队争霸活动，参赛队伍是四支来自的战队争霸活动，参赛队伍是四支来自的战队争霸活动，参赛队伍是四支来自支来自北美Killing Spree。Killing Spree是长期的战队争霸活动，参赛队伍是四支来自北美的顶尖战队。每支队伍想要获胜必须Killing Spree。Killing Spree是长期的战队争霸活动，参赛队伍是四支来自北美的顶尖战队。每支队伍想要获胜必须的顶尖战队。每支队伍想要获胜必须一路奋战，连赢三场，达到“大杀特杀（killing spree）”。比赛由NEO Dota主办</span>
            </div>
        )
    }
}
