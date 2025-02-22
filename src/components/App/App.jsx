
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ListGallery from "../../GalleryList/GalleryList";

function App() {
    return (
      <>
        <header data-testid="app">
          <h1>React Gallery</h1>
        </header>

       <ListGallery />
   
       </>);
}

export default App;
