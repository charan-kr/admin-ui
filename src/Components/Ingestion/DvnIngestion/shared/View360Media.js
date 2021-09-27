import React, { useEffect, useState } from "react";

function View360Media({ image }) {
  var dragItem;
  var container;
  var active = false;
  var diffX;
  var diffY;
  var initialX;
  var initialY;
  var pos = 0;
  const [imageSize] = useState({
    width: image.width,
    height: image.height,
  });
  const [numberOfimages] = useState(image.noOfImage);
  useEffect(() => {
    dragItem = document.querySelector("#img"); // eslint-disable-line react-hooks/exhaustive-deps

    container = document.querySelector("#main"); // eslint-disable-line react-hooks/exhaustive-deps
    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);
    getImageSize()
      .then((img) => {
        console.log(img.width, img.height);
        //setImageSize({ width: img.width, height: img.height });
        return img;
      })
      .then((img) => {
        dragItem.style.backgroundPosition = "0px 0px";
        dragItem.style.backgroundImage = "url(" + image.imageUrl + ")";
        dragItem.style.height = img.height + "px";
        dragItem.style.width = img.width / numberOfimages + "px";
      })
      .catch((error) => {
        alert(error);
      });
  }, [image]);

  async function getImageSize() {
    const img_ = new Image();
    img_.src = image.imageUrl;
    return Promise.resolve(img_);
  }
  function dragStart(e) {
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    } else {
      initialX = e.clientX;
      initialY = e.clientY;
    }

    active = true;
    if (e.target === dragItem) {
    }
  }

  function dragEnd(e) {
    active = false;
  }

  function drag(e) {
    let Y = diffY;
    if (active) {
      e.preventDefault();
      if (e.type === "touchmove") {
        diffX = e.touches[0].clientX - initialX;
        Y = e.touches[0].clientY - initialY;
      } else {
        diffX = e.clientX - initialX;
        Y = e.clientY - initialY;
      }
      diffY = Y;
      if (diffX > 20) {
        initialX = e.clientX;
        initialY = e.clientY;
        pos = (pos + 1) % numberOfimages;

        backgroundImagePos(Math.abs(pos));
      } else if (diffX < -20) {
        initialX = e.clientX;
        initialY = e.clientY;
        pos = (pos - 1) % numberOfimages;
        backgroundImagePos(pos);
      }
    }
  }

  const backgroundImagePos = (pos) => {
    dragItem.style.backgroundPosition =
      (-imageSize.width / numberOfimages) * pos +
      "px, " +
      imageSize.height +
      "px";
  };

  return (
    <React.Fragment>
      <div className="p-pt-5">
        <div id="main">
          <div id="img"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default View360Media;
