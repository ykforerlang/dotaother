/**
 * Created by yk on 2016/5/18.
 */

import React from "react"
import ReactDOM from "react-dom"

export default class LeagueType extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (<ul className="league-type">
            <li className={this.props.tier == 'premium' ? 'cur':''} onClick={this.props.clickHandler.bind(null, "premium")}>高端组</li>
            <li className={this.props.tier == 'professional' ? 'cur':''} onClick={this.props.clickHandler.bind(null, "professional")}>职业组</li>
            <li className={this.props.tier == 'amateur' ? 'cur':''} onClick={this.props.clickHandler.bind(null, "amateur")}>业余组</li>
        </ul>)
    }
}