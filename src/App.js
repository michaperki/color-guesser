import React, { Component } from 'react';
import ColorDisplay from './components/ColorDisplay';
import ColorUpload from './components/ColorUpload';

class App extends Component {
  constructor() {
    super();
    this.state = {
      targetColor: this.generateRandomColor(), // Initialize targetColor
      selectedColor: null, // Initialize selectedColor
    };
  }

  // Function to generate a random color in HEX format
  generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Function to change the target color
  changeTargetColor = () => {
    this.setState({ targetColor: this.generateRandomColor() });
  }

  // Function to set the selected color
  setSelectedColor = (color) => {
    this.setState({ selectedColor: color });
  }

  render() {
    const { targetColor, selectedColor } = this.state;

    // Extract RGB values from targetColor
    const targetColorRGB = [
      parseInt(targetColor.slice(1, 3), 16),
      parseInt(targetColor.slice(3, 5), 16),
      parseInt(targetColor.slice(5, 7), 16),
    ];

    return (
      <div className="App">
        <ColorDisplay targetColor={targetColor} changeTargetColor={this.changeTargetColor} />
        <ColorUpload
          selectedColor={selectedColor}
          targetColor={targetColorRGB} // Pass targetColor as an array of RGB values
          setSelectedColor={this.setSelectedColor}
        />
      </div>
    );
  }
}

export default App;
