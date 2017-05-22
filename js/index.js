"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      data: [],
      currentApi: ''
    };
    return _this;
  }

  App.prototype.getData = function getData(props) {
    var _this2 = this;

    // get data from api
    fetch(props.api).then(function (response) {
      return response.json();
    }).then(function (json) {
      _this2.setState({ data: json, currentApi: props.title });
    });
  };

  App.prototype.componentDidMount = function componentDidMount() {
    //load initial data
    this.getData(this.props.apiAllTime);
  };

  App.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "table",
        {
          style: {
            border: "2px solid #000",
            width: "800px",
            borderSpacing: "0"
          }
        },
        React.createElement(
          "caption",
          { style: { color: 'white', fontSize: '30px', marginBottom: '20px' } },
          "LeaderBoard"
        ),
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            { style: { textAlign: "center" } },
            "#"
          ),
          React.createElement(
            "th",
            { style: { textAlign: "center" } },
            "Camper Name"
          ),
          React.createElement(
            "th",
            { style: { textAlign: "center" } },
            React.createElement(
              "a",
              { href: "#", onClick: function onClick() {
                  return _this3.getData(_this3.props.apiRecent);
                } },
              "Points in past 30 days"
            )
          ),
          React.createElement(
            "th",
            { style: { textAlign: "center" } },
            React.createElement(
              "a",
              { href: "#", onClick: function onClick() {
                  return _this3.getData(_this3.props.apiAllTime);
                } },
              "All time points"
            )
          )
        ),
        this.state.data ? this.state.data.sort(function (a, b) {
          //sort rankings
          if (_this3.state.currentApi === 'recent') {
            return a.recent > b.recent ? -1 : 1;
          } else {
            return a.alltime > b.alltime ? -1 : 1;
          }
        }).map(function (points, index) {
          return React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              { style: { textAlign: "left", border: "2px solid black" } },
              index += 1
            ),
            React.createElement(
              "td",
              { style: { textAlign: "left", border: "2px solid black" } },
              React.createElement(
                "a",
                { href: 'https://www.freecodecamp.com/' + points.username },
                React.createElement(
                  "div",
                  null,
                  " ",
                  React.createElement("img", { width: "25", height: "25", src: points.img })
                ),
                points.username
              )
            ),
            React.createElement(
              "td",
              { style: { textAlign: "center", border: "2px solid black" } },
              points.recent
            ),
            React.createElement(
              "td",
              { style: { textAlign: "center", border: "2px solid black" } },
              points.alltime
            )
          );
        }) : false
      )
    );
  };

  return App;
}(React.Component);

var apiRecent = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
var apiAllTime = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
ReactDOM.render(React.createElement(App, {
  apiRecent: { api: apiRecent, title: 'recent' },
  apiAllTime: { api: apiAllTime, title: 'allTime' }
}), document.querySelector("#app"));