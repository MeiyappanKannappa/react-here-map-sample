import React from 'react';
import './App.css';
import HPlatform, { HMap, HMapPolyLine } from "react-here-map";


 
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      points :[
        { lat: "52.5309825", lng: "13.3845921" },
        { lat: "52.5311923", lng: "13.3853495" },
      ]
    }
    
  }

  componentDidMount(){
    alert('Mount')
    fetch('http://www.mocky.io/v2/5dc8207f3000002d00e1df62?mocky-delay=5000ms',{
      crossDomain:true,
      mode: "cors",
      headers: {'Content-Type':'application/json'},
    })
    .then(response => {
      console.log("Response ",response)
      return response.json()})
    .then(data => {
      console.log(data)
      this.setState({ points: data});
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
        app_id="XXXX"
        app_code="XXX"
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
