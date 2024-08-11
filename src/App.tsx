import React from 'react'
import './App.css'
import { GifContainer } from './components/GifContainer'
import { GifUtils } from './utils/gif-utils'
import { IGIFFrame } from '@fand/gifuct-js'

function App() {
  const [frames, setFrames] = React.useState<IGIFFrame[]>([])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)
    if (file) {
      // create previewUrl
      const previewUrl = URL.createObjectURL(file)
      // create img element
      const img = document.createElement('img')
      img.src = previewUrl
      img.alt = file.name
      // append img element to gifSelectedContainer
      const gifSelectedContainer = document.getElementById('gif-selected-container')
      if (gifSelectedContainer) {
        gifSelectedContainer.appendChild(img)
      }
      console.log("calling getFrames")
      GifUtils.getFrames(previewUrl).then(data => {
        console.log("got frames", data);
        setFrames(data);
      });
    }

  }

  return (
    <>
      <form>
        <label id='gif-label' htmlFor="gif-input">
          <span>Selecione ou arraste o gif</span>
        </label>
        <input id='gif-input' type="file" hidden onChange={onFileChange}/>
      </form>
      {
        frames && frames.length > 0 && <GifContainer frames={frames} />
      }
        
    </>
  )
}

export default App
