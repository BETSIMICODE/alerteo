import React, { useState, useRef, useEffect } from "react";
import { Mic, Search, Camera, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const SearchBar = ({ onSearch, onImageUpload, onSearchResults }) => {
  const [searchText, setSearchText] = useState("");
  const [image, setImage] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const recognitionRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current && cameraActive) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (error) {
          console.error("Erreur lors de l'accès à la caméra :", error);
        }
      };

      startCamera();

      return () => {
        const stream = videoRef.current?.srcObject;
        const tracks = stream?.getTracks();
        tracks?.forEach((track) => track.stop());
      };
    }
  }, [cameraActive]);

  const handleCameraToggle = () => {
    setCameraActive((prevState) => !prevState);
    setIsPopupOpen(true);
  };

  const stopRecordingCam = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
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

      const stream = videoRef.current.srcObject;
      stopRecordingCam();

      const formData = new FormData();
      const byteString = atob(imageUrl.split(',')[1]);
      const mimeString = imageUrl.split(',')[0].split(':')[1].split(';')[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: mimeString });
      formData.append("image", blob, "captured-image.png");

      setIsScanning(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_EXPRESS_URL}/api/product/search`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        onSearchResults(res.data);
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'image :", error);
      } finally {
        setIsScanning(false);
        setIsPopupOpen(false);
        setImage(null);
      }
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const newRecognition = new SpeechRecognition();
    newRecognition.lang = "fr-FR";

    newRecognition.onstart = () => setIsListening(true);
    newRecognition.onresult = (event) => {
      let result = event.results[0][0].transcript.replace('.', '');
      setSearchText(result);
      onSearch(result);
      setIsListening(false);
    };
    newRecognition.onerror = () => setIsListening(false);

    newRecognition.start();
    recognitionRef.current = newRecognition;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onImageUpload(imageUrl);

      const formData = new FormData();
      formData.append("image", file);
      setIsPopupOpen(true);

      setIsScanning(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_EXPRESS_URL}/api/product/search`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        onSearchResults(res.data);
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'image :", error);
      } finally {
        setIsScanning(false);
        setIsPopupOpen(false);
        setImage(null);
      }
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setImage(null);
    onSearchResults([]);
  };

  return (
    <div className="flex flex-col items-center text-blue-100 justify-center w-full p-20">
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Rechercher..."
          className="w-full py-3 pl-12 pr-16 text-lg border border-b-blue-500 rounded-full focus:outline-none focus:ring-1 transition"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={24} />
        {searchText && (
          <button
            onClick={clearSearch}
            className="absolute right-14 top-1/2 transform -translate-y-1/2 text-blue-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
          <button
            onClick={handleVoiceSearch}
            className={`p-2 rounded-full transition ${isListening ? "bg-blue-500 text-white animate-pulse" : "bg-gray-100 text-gray-700 hover:bg-blue-200"}`}
          >
            <Mic size={20} />
          </button>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1"
            >
              <Camera size={20} />
              <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg overflow-hidden z-10">
                <button
                  onClick={() => {
                    handleCameraToggle();
                    setDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  Utiliser la caméra
                </button>
                <label className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Importer une image
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {isPopupOpen && (
  <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-3xl shadow-2xl relative w-80 sm:w-96 transform transition-all duration-300 ease-in-out hover:scale-105">
      <button
        onClick={() => { setIsPopupOpen(false); stopRecordingCam(); }}
        className="absolute top-1 right-1 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition duration-200 ease-in-out transform hover:rotate-90"
      >
        <X size={20} />
      </button>

      {cameraActive && (
        <div className="mt-4 relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-gray-200 shadow-inner">
          <video ref={videoRef} className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110" />
          <canvas ref={canvasRef} className="hidden" />
          <button
            onClick={handleCapture}
            className="absolute bottom-4 cursor-pointer left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out hover:scale-105 flex items-center justify-center"
          >
            <Camera size={30} />
          </button>
        </div>
      )}

      {image && (
        <div className="mt-4 relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200">
          <img src={image} alt="Captured" className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110" />
          {isScanning && (
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50"
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
};

export default SearchBar;
