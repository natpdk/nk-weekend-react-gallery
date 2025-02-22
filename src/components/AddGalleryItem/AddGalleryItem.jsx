import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";



function AddGalleryItem({fetchGallery}) {

  const [titleText, setTitle] = useState('')
  const [urlText, setURl] = useState('')
  const [descriptionText, setDescription] = useState('')

  const addGalleryItem = () =>{

   console.log("in AddGalleryItem")

   const addingItem = {
    url: urlText,
    title: titleText,
    description: descriptionText
   }

   axios({
    method: "POST",
    url: "/api/gallery",
    data: addingItem
  })
    .then((response) => {
      console.log("POST worked! Woot woot")
      //console.log(todoText)
     fetchGallery();
      setTitle('');
      setDescription('');
      setURl('');
    })
    .catch((error) => {
      console.error("POST /api/todo is broken",error)
    })

  }

return (
        <div>
    
         <input value={urlText} type="text" placeholder="Image URL" onChange={(e)=>setURl(e.target.value)} />
         <input value={titleText} type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
         <input value={descriptionText} type="text" placeholder="Description" onChange={(e)=>setDescription(e.target.value)} />
         <button className="InputButton" onClick={addGalleryItem}> Add Post</button>

       
         </div>
         );
}

export default AddGalleryItem;