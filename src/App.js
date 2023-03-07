import { useEffect, useState } from 'react';
import './App.css';


function App() {

const [astronauts, setAstronauts] = useState([])
const [issPosition, setIssPosition] = useState({})

useEffect(() => {
  fetch('http://api.open-notify.org/astros.json')
  .then(i => i.json())
  .then(i => setAstronauts(i))
  .catch(error => console.log(error))
}, [])

useEffect(() => {
  fetch('http://api.open-notify.org/iss-now.json')
  .then(j => j.json())
  .then(j => setIssPosition(j))
  .catch(error => console.log(error))
}, [])

let num = astronauts.number;

const astronautsInSpace = astronauts.people?.map(a => <div className="in-space" key={num--}>
  <h3>Craft: {a.craft}</h3>
  <h3>Astronaut: {a.name}</h3>
</div>)


  return (
    <div className="App">
      <div>
        <h2>Current location of the ISS:</h2>
        <p>Current Latitude: {issPosition.iss_position?.latitude || ""}</p>
        <p>Current Longitude: {issPosition.iss_position?.longitude || ""}</p>
        <a href={`https://www.google.com/search?q=${issPosition.iss_position?.latitude}%2C++${issPosition.iss_position?.longitude}&ei=71UHZJymBO_LwbkPmsKi2AM&ved=0ahUKEwjc2fz3jsr9AhXvZTABHRqhCDsQ4dUDCBA&uact=5&oq=${issPosition.iss_position?.latitude}%2C++${issPosition.iss_position?.longitude}&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQA0oECEEYAVAAWABgrAhoAXAAeACAAQCIAQCSAQCYAQDAAQE&sclient=gws-wiz-serp`} target="_blank" rel="noreferrer"><h3>See Location!</h3></a>
      </div>
      <h2>Astronauts currently in space</h2>
      <p>Total astronauts currently in space: {astronauts.number}</p>
      <div id="in-space">
        {astronautsInSpace}
      </div>
    </div>
  );
}

export default App;
