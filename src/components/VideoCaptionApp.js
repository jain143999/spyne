import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Container, Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import "./VideoCaptionApp.css";

const VideoCaptionApp = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [captionText, setCaptionText] = useState("");
  const [captionTime, setCaptionTime] = useState("");
  const [currentCaption, setCurrentCaption] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const addCaption = () => {
    setCaptions([
      ...captions,
      { text: captionText, time: parseFloat(captionTime) },
    ]);
    setCaptionText("");
    setCaptionTime("");
  };

  const handleProgress = (state) => {
    const currentTime = state.playedSeconds;
    const activeCaption = captions.find(
      (caption) => Math.abs(caption.time - currentTime) < 1
    );
    setCurrentCaption(activeCaption ? activeCaption.text : "");
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Container className="my-4">
      <h1 className="heading">Video Caption App</h1>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="form-container">
            <Form>
              <Form.Group controlId="videoUrl">
                <Form.Label className="form-label">Video URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter video URL"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="captionText">
                <Form.Label className="form-label">Caption Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter caption text"
                  value={captionText}
                  onChange={(e) => setCaptionText(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="captionTime">
                <Form.Label className="form-label">
                  Caption Time (in seconds)
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter time in seconds"
                  value={captionTime}
                  onChange={(e) => setCaptionTime(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={addCaption}
                className="btn-primary"
                disabled={!captionText.trim() || !captionTime.trim()}
              >
                Add Caption
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={8} className="mx-auto">
          <div className="video-container">
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              controls
              playing={isPlaying}
              width="100%"
              height="100%"
              onProgress={handleProgress}
            />
            <div className="captions-container">
              {currentCaption && (
                <div className="caption">{currentCaption}</div>
              )}
            </div>
          </div>
          <div className="play-pause-container">
            <Button
              variant="primary"
              onClick={handlePlayPause}
              className="mx-2"
            >
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="captions-list-container">
        <Col md={8} className="mx-auto">
          <h4>Captions</h4>
          <ListGroup>
            {captions.map((caption, index) => (
              <ListGroup.Item key={index}>
                {caption.time} seconds: {caption.text}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default VideoCaptionApp;
