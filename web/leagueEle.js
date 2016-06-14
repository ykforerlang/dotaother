/**
 * Created by yk on 2016/5/19.
 */


import React from "react"
import ReactDOM from "react-dom"

var DEFAULT_LEAGUE_ICON = "http://cdn.dota2.com.cn/apps/dota2/images/tv/directory_underneath.png"

export default class LeagueEle extends React.Component {
    constructor() {
        super()
    }

    handlerClick() {
        location.href = "/league.html?leagueid=" + this.props.leagueid
    }

    render() {
        return (<li onClick={this.handlerClick.bind(this)}>
                <img src={this.props.image || DEFAULT_LEAGUE_ICON}/>
                <label className={this.props.free_to_spectate ? "league-with-tag" : "league-no-tag" }>{this.props.free_to_spectate ? "免费观看" : "" }</label>
                <h3>{this.props.name}</h3>
                <label className="league-money">{this.props.pricePool}$</label>
                <span>{this.props.description}</span>
            </li>
        )
    }
}