/**
 * Created by yk on 2016/5/19.
 */

import React from "react"
import ReactDOM from "react-dom"
import LeagueEle from "./leagueEle"
import $ from "jquery"


export default class LeagueList extends React.Component {
    constructor() {
        super()
    }

    //state = {leagueList:[{league_id:"1"}]}

    render() {
        var leagueList = this.props.leagueList
        console.log(leagueList)

        if (! leagueList) {
            return (<ul className="league-list"></ul>)
        }

        return (<ul className="league-list">
            {leagueList.map(function(item) {
                return <LeagueEle key={item.leagueid}  {...item}></LeagueEle>;
            })}
        </ul>)
    }
}