/**
 * Created by yk on 2016/6/6.
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Match from './match'

export  default class MatchList extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="matches-list">
                <h3 className="title"><span>详细比赛</span></h3>

                <ul>
                    <Match/>
                </ul>
            </div>
        )
    }
}