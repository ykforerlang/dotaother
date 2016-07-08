/**
 * Created by yk on 2016/6/16.
 */
import React from "react"
import ReactDOM from "react-dom"
import HeroesPng from "./heroes.png"
import TestPng from "./test.png"

class SvgTest extends React.Component {
    constructor() {
        super()
    }


    render() {
        console.log(TestPng)
        return (
                <svg ref="svg" width="600" height ="600" >
                    <path
                        transform={`rotate(0.5, 300, 300)`}
                        fill="none" stroke="#00D8FF" strokeWidth="24" strokeMiterlimit="10" d="M299.529,197.628
            c67.356,0,129.928,9.665,177.107,25.907c56.844,19.569,91.794,49.233,91.794,76.093c0,27.991-37.041,59.503-98.083,79.728
            c-46.151,15.291-106.879,23.272-170.818,23.272c-65.554,0-127.63-7.492-174.29-23.441c-59.046-20.182-94.611-52.103-94.611-79.559
            c0-26.642,33.37-56.076,89.415-75.616C167.398,207.503,231.515,197.628,299.529,197.628z"/>
                </svg>
        )
    }
}


var root = document.getElementById("root")
ReactDOM.render(<SvgTest/>, root)
