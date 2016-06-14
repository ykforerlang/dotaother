/**
 * Created by yk on 2016/6/6.
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import LeagueIntro from './leagueIntro'
import MatchList from './matchList'

import $ from 'jquery'
import common from '../util/common'

class League extends Component {
    constructor() {
        super()
        let leagueid = common.getParaFromLocation("leagueid")
        this.state = {leagueInfo:null, matchList:null, leagueid: leagueid}
    }

    componentDidMount() {
        this.initLeague()
    }

    initLeague() {
        var self = this
        $.get("/league/${this.state.leagueid}", function(result){
            if (result.code != 0) {
                //TODO error
            } else {
                self.setState({})
            }
        }, 'json' )
    }

    render() {
        return (
            <div className="matches">
                <LeagueIntro {...this.state.leagueInfo}/>
                <MatchList matchs = {this.state.matchList}/>
            </div>
        )
    }
}

var root = document.getElementById("root")
ReactDOM.render(<League/>, root)