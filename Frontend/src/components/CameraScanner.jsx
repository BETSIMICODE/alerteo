import React, { useState, useRef, useEffect } from "react";
import { Camera, X } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const CameraUploader = ({ onImageUpload, onScanResults }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [image, setImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && cameraActive) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (error) {
          console.error("Erreur lors de l'accès à la caméra :", error);
        }
      };
      startCamera();
      return () => {
        const stream = videoRef.current?.srcObject;
        stream?.getTracks().forEach((track) => track.stop());
      };
    }
  }, [cameraActive]);

  const handleCameraToggle = () => {
    setCameraActive((prev) => !prev);
  };

  const handleCapture = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL("image/png");
      setImage(imageUrl);
      onImageUpload(imageUrl);
      await uploadImage(imageUrl);
      handleCameraToggle();
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onImageUpload(imageUrl);
      await uploadImage(file);
    }
  };

  const uploadImage = async (imageData) => {
    const formData = new FormData();
    if (typeof imageData === "string") {
      const byteString = atob(imageData.split(",")[1]);
      const mimeString = imageData.split(",")[0].split(":")[1].split(";")[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([uint8Array], { type: mimeString });
      formData.append("image", blob, "captured-image.png");
    } else {
      formData.append("image", imageData);
    }

    setIsScanning(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_EXPRESS_URL}/api/maladie/search`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      onScanResults(res.data);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image :", error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-center text-xl font-semibold text-gray-800">
  Scanner vos symptômes pour une meilleure prise en charge
</h2>


    <div className="flex flex-col items-center w-full p-6">
      <div className="flex space-x-4">
        <button
          onClick={handleCameraToggle}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          <Camera size={20} />
          <span>{cameraActive ? "Arrêter la caméra" : "Utiliser la caméra"}</span>
        </button>

        <label className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-300">
          <Camera size={20} />
          <span>Uploader une image</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      </div>

      {cameraActive && (
        <div className="mt-4 relative w-64 h-64">
          <video ref={videoRef} className="w-full h-full object-cover rounded-lg shadow-md" />
          <canvas ref={canvasRef} className="hidden" />
          <button
            onClick={handleCapture}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full"
          >
            Capturer
          </button>
        </div>
      )}

      {image && (
        <div className="mt-4 relative w-64 h-64 overflow-hidden rounded-lg shadow-lg border border-gray-700">
        <img src={image} alt="Captured" className="w-full h-full object-cover rounded-lg" />
        
        {isScanning && (
          <motion.div
            className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-50"
            initial={{ y: "-100%" }}
            animate={{ y: "200%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
  
        <button
          onClick={() => setImage(null)}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition"
        >
          <X size={18} />
        </button>
      </div>
      )}
    </div>
    </div>
  );
};

export default CameraUploader;
