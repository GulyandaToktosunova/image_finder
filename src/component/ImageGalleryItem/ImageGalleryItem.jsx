import React from "react";

export default function ImageGalleryItem({
  webformatURL,
  tags,
  showModal,
  largeImageURL,
}) {
  return (
    <li
      onClick={() => {
        showModal(largeImageURL);
      }}
      className="ImageGalleryItem"
    >
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  );
}
