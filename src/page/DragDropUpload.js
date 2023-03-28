import React, { Fragment, useState } from "react";

function DragDropUpload() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(files[i]);
    }
    setSelectedImages(images);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    // const images = [];
    for (let i = 0; i < files.length; i++) {
      //   images.push(files[i]);
      setSelectedImages((prev) => [...prev, files[i]]);
      //   preview.push(URL.createObjectURL(files[0]))
      setPreview((prev) => [...prev, URL.createObjectURL(files[i])]);
    }
    // setSelectedImages(images);
    // setPreview(preview)
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUploadImages = () => {
    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("images", selectedImages[i]);
    }
    // Call API to upload images using formData
  };

  const deleteItemImage = (id) => {
   const del = preview.filter((d,i) => i !== id);
   setPreview(del)
  }

  return (
    <div>
      <input type="file" multiple onChange={handleImageChange} />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ width: "100%", height: "200px", border: "2px dashed black" }}
      >
        {preview.length === 0 ? (
          <p>Drag and drop images here</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "nowrap", gridTemplateColumns:'repeat(4, 1fr)' }}>
            {" "}
            {preview.map((image, i) => {
              return (
                 <Fragment key={i}>
                 <span onClick={()=>deleteItemImage(i)} className="delete">x</span>
                  <img style={{ width: "10%", marginLeft: 0,float:'left'}} src={image} />
                 </Fragment>
              );
            })}
          </div>
        )}
      </div>
      <button onClick={handleUploadImages}>Upload Images</button>
    </div>
  );
}

export default DragDropUpload;
