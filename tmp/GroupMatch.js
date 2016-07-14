/**
 * Created by yk on 2016/7/14.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

import AccordionTitle from 'AccordionTitle'

export default class GroupMatch extends  Component {
    constructor(props) {
        super(props)
    }

    render() {
        const matches = this.props.sub_matches
        const brief = {
            radiantTeamId: this.props.radiant_team_id,
            direTeamId: this.props.dire_team_id,
            createTime: this.props.createTime,
        }

        let matchBrief = (<View>

        </View>)

        let matches = (<View>

        </View>)

        return (
            <AccordionTitle header = {matchBrief} content={matches}/>
        )

    }
}
