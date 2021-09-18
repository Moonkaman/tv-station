import { useEffect, useState, useRef } from 'react'

import './App.css';

const scheduleHeaders = {
  'Access-Control-Allow-Origin': '*'
}

function App() {

  const videoPlayer = useRef(null)

  useEffect(() => {
    fetch("http://localhost:8000/schedule", {
      headers: scheduleHeaders
    })
    .then(res => res.json())
    .then(data => {
      const startTime = (Date.now() - data.currentVideoStartTime) / 1000
      console.log(startTime)
      videoPlayer.current.currentTime = 0
      // videoPlayer.current.defaultMuted = false
      // videoPlayer.current.volume = 0.4
    })

    videoPlayer.current.addEventListener('ended', () => {
      console.log('video ended')
    })
  }, [])

  return (
    <div className="App">
      <h1>Tv App</h1>
      <video ref={videoPlayer} width="650" autoPlay={true} muted>
        <source src="http://localhost:8000/video/test-media/vid1.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default App;
