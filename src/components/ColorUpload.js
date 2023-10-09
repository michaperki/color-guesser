import React, { Component } from "react";
import "./ColorUpload.css";
import { deltaE, rgb2lab } from "./Utils"; // Import the utility functions

class ColorUpload extends Component {
  constructor() {
    super();
    this.state = {
      uploadedImage: null,
      showSubmitButton: false,
      feedback: "",
      score: 0,
    };
  }

  // Function to handle image upload
  handleImageUpload = (e) => {
    const uploadedImage = new Image();
    uploadedImage.src = URL.createObjectURL(e.target.files[0]);
    uploadedImage.onload = () => {
      this.setState({ uploadedImage });
    };
  };

  // Function to identify color at a selected pixel
  identifyColor = (e) => {
    const { uploadedImage } = this.state;
    if (uploadedImage) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = uploadedImage.width;
      canvas.height = uploadedImage.height;
      context.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const pixel = context.getImageData(x, y, 1, 1).data;

      const selectedColor = [pixel[0], pixel[1], pixel[2]]; // Pass RGB values as an array
      this.props.setSelectedColor(selectedColor); // Update selectedColor in App.js
      this.setState({ showSubmitButton: true });
    }
  };

  // Function to handle color submission
  handleSubmitColor = () => {
    console.log("Submitting color...");
    console.log(this.props.selectedColor);
    console.log(this.props.targetColor);
    const { selectedColor, targetColor } = this.props;

    console.log("LAB selectedColor:", rgb2lab(selectedColor));
    console.log("LAB targetColor:", rgb2lab(targetColor));

    // Calculate color difference using the deltaE function
    const colorDiff = deltaE(
      rgb2lab(selectedColor), // Convert selectedColor to LAB
      rgb2lab(targetColor) // Convert targetColor to LAB
    );

    console.log(colorDiff);

    // Calculate the score based on the color difference
    const maxDifference = 30; // Maximum possible difference in LAB space
    const score = Math.max(0, 100 - (colorDiff / maxDifference) * 100);

    // Provide feedback based on the score
    let feedback;
    if (score >= 90) {
      feedback = "Excellent! Your color guess is almost perfect.";
    } else if (score >= 70) {
      feedback = "Great job! You're very close to the target color.";
    } else if (score >= 50) {
      feedback = "Good effort! You're getting closer to the target color.";
    } else {
      feedback = "Keep trying. Your color is still quite far from the target.";
    }

    this.setState({ feedback, score });
  };

  // Function to convert RGB array to RGB string
  rgbArrayToRgbString(rgbArray) {
    return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
  }

  render() {
    const { uploadedImage, showSubmitButton, feedback } = this.state;

    return (
      <div className="color-upload">
        <h2>Color Upload</h2>
        <input type="file" accept="image/*" onChange={this.handleImageUpload} />
        {uploadedImage && (
          <div>
            <div
              className="uploaded-image-container"
              onClick={this.identifyColor}
            >
              <img
                className="uploaded-image"
                src={uploadedImage.src}
                alt="Uploaded"
              />
            </div>
            {this.props.selectedColor && (
              <div className="selected-color">
                Selected Color:{" "}
                <div
                  className="color-preview"
                  style={{
                    backgroundColor: this.rgbArrayToRgbString(
                      this.props.selectedColor
                    ),
                  }}
                ></div>
              </div>
            )}
            {showSubmitButton && (
              <div>
                <button
                  className="submit-button"
                  onClick={this.handleSubmitColor}
                >
                  Submit Color
                </button>
                {feedback && (
                  <div className="feedback">
                    <p className="score">
                      Score: {this.state.score.toFixed(2)}
                    </p>
                    <p>{feedback}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ColorUpload;
