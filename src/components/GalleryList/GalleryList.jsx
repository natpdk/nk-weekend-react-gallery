import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import GalleryItem from "../GalleryItem/GalleryItem";
import AddGalleryItem from "../AddGalleryItem/AddGalleryItem";

function ListGallery() {
// setting statte to a an empty array
    const [galleryList, setGalleryList] = useState([])
    // getting DB to post to the DOM 
     useEffect(()=>{
       fetchGallery();},[])
  
    const fetchGallery = () =>{
      console.log("fetching..")
  
      axios({
        method: "GET",
        url: "/api/gallery"
    })
    .then((response) => {
        console.log("Response: ", response.data)
        // adding the DB contents into the empty array above
        setGalleryList(response.data)
    })
    .catch((err) => {
        console.log("GET /api/gallery is broken")
    })
    }
  
  return (
  <div className="container" data-testid="galleryList">

    <AddGalleryItem fetchGallery={fetchGallery}/>
    

  {galleryList.map((item) => (
    <GalleryItem key={item.id} gallery={item} fetchGallery={fetchGallery}/>
  ))}
  </div>
  )
};

export default ListGallery;