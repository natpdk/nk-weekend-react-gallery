import React, { useState } from "react";
import axios from "axios";

function GalleryItem({ gallery, fetchGallery }) {
  // State for tracking selected image and likes
  const [selectedImageId, setSelectedImageId] = useState('');
  const [likes, setLikes] = useState(gallery.likes);

  // Update likes when the "Love it!" button is clicked
  const updateLikes = (id) => {
    axios({
      method: "PUT",
      url: `/api/gallery/like/${id}`,
      data: { likes: likes + 1 },
    })
      .then((response) => {
        console.log("PUT response:", response.data);
        setLikes(likes + 1); // Update local state
        fetchGallery(); // Refresh the gallery
      })
      .catch((error) => {
        console.log("Error updating likes:", error);
      });
  };

  // Toggle between showing the image and the description
  const toggleDescription = (id) => {
    // got some help from Phind to see why my test weren't passing
    setSelectedImageId((prev) => (prev === id ? null : id));
  };

  function deleteGalleryItem ( id ) {
    
    console.log('Deleting GalleryItem with Id:', id)
    
      axios({
        method: 'DELETE',
        url: `/api/gallery/${id}`
      })
        .then(() => {
          console.log('Deleted Todo successfully!');
          fetchGallery();
        })
        .catch((error) => {
          console.log('Error deleting todo', error);
        });
      }

  return (
    <div className="galleryList" data-testid="galleryItem">
       <button className="top-right-button"
       onClick={() => deleteGalleryItem(gallery.id)}>
        ❌
       </button>
       <div className="galleryContent">
      {selectedImageId === gallery.id ? (
        // Show the description if selected
        <p 
          onClick={() => toggleDescription(gallery.id)}
          style={{ cursor: "pointer" }}
          data-testid="toggle"
          className="innerText"
        >
          {gallery.description}
        </p>
      ) : (
        // Show the image if not selected
        <img
          src={gallery.url} width='175px'
          alt={gallery.title}
          onClick={() => toggleDescription(gallery.id)}
          style={{ cursor: "pointer", alignContent: "center"}}
          data-testid="toggle"
          className="innerImg"
        />
      )}
      {/* Additional content such as title, button, and likes */}
      <br />
      {gallery.title}
      <br />
      <div className="innerLike">
        <button
          data-testid="like"
          onClick={() => updateLikes(gallery.id)}
        >
          Love it!
        </button>
        <br />
        {likes} people love this!
        </div>
      </div>
    </div>
  );
}

export default GalleryItem;