import { useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";

function ImageCrop({
  src,
  setCropComplete,
  cropComplete,
  setStartCropping,
  styles,
  handleImageCrop,
}) {
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [output, setOutput] = useState("");

  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (cropComplete) {
      cropImageNow();
    }
  }, [cropComplete]);

  const cropImageNow = () => {
    const image = imageRef.current;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL("image/png");
    setOutput(base64Image);

    handleImageCrop(base64Image);
  };

  return (
    <div>
      <ReactCrop crop={crop} onChange={(crop) => setCrop(crop)}>
        <img
          ref={imageRef}
          src={output || src}
          className="w-full h-full"
          crossOrigin="anonymous"
          style={{ width: styles.width, height: styles.height }}
        />
      </ReactCrop>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default ImageCrop;
