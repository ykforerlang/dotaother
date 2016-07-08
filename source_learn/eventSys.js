/**
 * Created by yk on 2016/7/1.
 */
var HelloWorld = React.createClass({
    render: function() {
        return (
            React.createElement("p", {}, React.createElement("span", {}, "hello world"))
        );
    }
});

    ReactDOM.render(
        React.createElement(HelloWorld, {}),
        document.getElementById('example')
    );