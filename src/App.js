import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '8887b3bed77c4d7687d35a45696a5d49'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedin: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    console.log(clarifaiFace)
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

displayFaceBox = (box) => {
  this.setState({box: box})
}

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(err => {
      console.log(err);
    });
  }

  onChangeRoute = (route) => {
    if (route === 'signout') {
      this.setState({isSignedin: false})
    } else if (route === 'home') {
      this.setState({isSignedin: true})
    }
    this.setState({route: route})
  }

  render () {
    const { isSignedin, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Navigation onChangeRoute = {this.onChangeRoute} isSignedin = {isSignedin}/>
        <Particles className="particles"
          params={particlesOptions} />
        {route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition 
              imageUrl={imageUrl}
              box={box}/>
            </div>  
          : (
              route === 'signin'
              ? <Signin onChangeRoute = {this.onChangeRoute}/>
              : <Register onChangeRoute = {this.onChangeRoute}/>
            )
        }
      </div>
    );
  }
}

export default App;
