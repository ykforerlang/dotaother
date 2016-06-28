/**
 * Created by yk on 2016/6/21.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';

export default class TitleScorll extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const childArray = React.Children.toArray(this.props.children)
        this.fixedComp = React.cloneElement(childArray[1], {style: [styles.fixedComp]})
        childArray.push(this.fixedComp)
        const third = childArray[2]
        third.onMoveShouldSetResponder =  (evt) => this._getScrollDirection(evt) === 'down' ?  true : false

        return (
            <ScrollView  style={[styles.scrollContent, this.props.style]}
                onResponderTerminationRequest = {(evt) =>  e.nativeEvent.contentOffset.y === 0 ? true : false }
                onScroll={(event) => this._handleScroll(event)}
            >
                {childArray}
            </ScrollView>
        )
    }

    _handleScroll(event) {

        if (e.nativeEvent.contentOffset.y === this.props.fixHeight) {
            const opa = (this._getScrollDirection(event) === 'up' ? 1 : 0)
            this.fixedComp.setNativeProps({
                style: {
                    opacity: opa,
                },
            })
        }
    }

    _getScrollDirection(event) {
        console.warn(JSON.stringify(event))
    }
}

const styles = StyleSheet.create({
    fixedComp: {
        position: 'absolute',
        left:0,
        top:0,
    },

    scrollContent: {

    }
})
