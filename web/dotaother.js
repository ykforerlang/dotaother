/**
 * Created by yk on 2016/4/27.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import $ from "jquery"

import LeagueType from './leagueType'
import LeagueList from './leagueList'

var DEFAULT_TIER = 'premium'

class LeagueMain extends React.Component {
    constructor() {
        super()
        console.log("init")
        this.state = {tier:DEFAULT_TIER,leagueList:null}
    }

    componentDidMount() {
        this.changeType(DEFAULT_TIER)
    }

    changeType(tier) {
        var self = this
        $.post("/league/list",
            {tier:tier},
            function(result) {
            if (result.code != 0) {
                console.log("error....")
                return
            }
            self.setState({tier:tier,leagueList:result.data})
            //self.state.leagueList = result.data
        }, 'json')
    }

    leagueTypeClick(tier) {
        console.log(tier)
        this.changeType(tier)
    }


    render() {
        console.log("hi")
        return (
            <div className="league"  >
                <LeagueType clickHandler={this.leagueTypeClick.bind(this)} tier={this.state.tier}></LeagueType>
                <LeagueList leagueList={this.state.leagueList}></LeagueList>
            </div>
        )
    }
}

var root = document.getElementById("root")
ReactDOM.render(<LeagueMain/>, root)



