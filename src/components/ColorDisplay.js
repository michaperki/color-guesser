import React, { Component } from 'react';

class ColorDisplay extends Component {
  render() {
    const { targetColor, changeTargetColor } = this.props;

    return (
      <div>
        <div
          style={{
            backgroundColor: targetColor,
            width: '200px',
            height: '200px',
            borderRadius: '50%',
          }}
        ></div>
        <button onClick={changeTargetColor}>Generate Random Color</button>
      </div>
    );
  }
}

export default ColorDisplay;
