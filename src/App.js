import React from 'react';
import './App.css';
import HPlatform, { HMap, HMapPolyLine } from "react-here-map";
import socketIOClient from "socket.io-client";


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      points: [
        { lat: "12.9368939", lng: "80.19952201725606" },
        { lat: "12.9368937", lng: "80.19952201725606" }
      ]
    }

  }

  componentDidMount() {

    //Very simply connect to the socket
    const socket = socketIOClient("http://gps-data-stream.herokuapp.com/gps_reciever");
    //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    socket.on('connect', function (data) {
      console.log(' gps_sender connected!', data);
      // chat.emit(' gps_sender connected!');
      var client_data = {
        client_id: "Meiyappan"
      }
      socket.emit("usercontext", client_data);

      //gps_sender.emit("drivergps",{driver:'driver'});
    });
    var pointsarr=this.state.points;
    socket.on('providecurrentstate', function(data) {
      console.log('Driver new GPS !', data);
      var gps={};
      gps.lat=data.latitude;
      gps.lng=data.longitude;
      pointsarr.push(gps);
      console.log(pointsarr);
      this.setState({ points: pointsarr });
    }.bind(this));


    alert('Mount')
    fetch('http://www.mocky.io/v2/5dc8207f3000002d00e1df62?mocky-delay=5000ms', {
      crossDomain: true,
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        console.log("Response ", response)
        return response.json()
      })
      .then(data => {
        console.log(data)
        //this.setState({ points: data });
        console.log(this.state.points)
        this.forceUpdate()
      })
      .catch(error => {

        console.log(error)

      })
  }

  render() {
    return (
      <HPlatform
        app_id="XXXXXX"
        app_code="XXXXX"
        useCIT
        useHTTPS
        includeUI
        includePlaces
      >
        <HMap
          style={{
            height: "400px",
            width: "800px"
          }}
          mapOptions={{ zoom: 10 }}
        >
          <HMapPolyLine points={this.state.points} />
        </HMap>
      </HPlatform>
    )
  }
}

export default App;
