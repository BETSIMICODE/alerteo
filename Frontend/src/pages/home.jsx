import React, { useState, useRef, useEffect } from "react";
import Logo from "../../public/img/logo.jpeg"; // Assure-toi que le chemin de l'image est correct
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import Chatbot from "@/components/Chatbot";
import DangerMap from "./itineraire";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Modal from "@/components/Modal";
import SideModal from "@/components/SideModal";
import Navbar from "@/components/NavBar";
import CameraScanner from "@/components/CameraScanner";
gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const [images, setImages] = useState(null);
  const [scanResults, setScanResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const elements = gsap.utils.toArray(section.children); // Récupère tous les enfants

    gsap.fromTo(
      elements,
      { opacity: 0, y: 100, scale: 0.95 }, // Ajout de scale pour un effet plus naturel
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "expo.out", // Effet pro avec une décélération fluide
        stagger: 0.15, // Délais courts entre chaque élément pour une sensation fluide
        scrollTrigger: {
          trigger: section,
          start: "top 70%", // Début fluide, sans que ça arrive trop tôt
          end: "top 50%",
          scrub: 0.5, // Lissage du scroll sans être trop brutal
        },
      }
    );
  }, []);

  // Gère l'état du pop-up
  const addSymptom = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setSymptoms([...symptoms, inputValue]);
      setInputValue(''); // Réinitialiser le champ input après l'ajout
    }
  };
  // Fonction pour ouvrir et fermer le modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="relative font-poppins flex h-[80vh] content-center items-center justify-center pt-16 pb-32">
        <Chatbot />
        <Navbar />
        <div className="absolute top-0 left-0 h-full w-full bg-black" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                
                <button
                  type="button"
                  className="flex m-auto rounded-full border-4 p-4 border-yellow-500 animate-bounce-up"
                  onClick={toggleModal}
                >
                  a
                  <span className="text-red-600 text-6xl animate-bounce font-poppins">!</span>
                  erteo
                </button>
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <section  className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" ref={sectionRef}>
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>

          <div className="mt-32 flex flex-wrap items-center p-6">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Contribuez à Sauver des Vies
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                Chaque don renforce notre capacité à détecter et à agir rapidement contre les épidémies
              </Typography>
              <Button onClick={() => setIsOpen(true)} variant="filled" className="w-full bg-gradient-to-r from-yellow-400 to-black text-white py-3 rounded-lg hover:opacity-90 transition">Faire un don</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <img src="/img/p1.jpg" alt="" className="rounded-lg shadow-xl" />
                <img src="/img/b2.jpg" alt="" className="rounded-lg shadow-xl" />
                <img src="/img/b4.jpg" alt="" className="rounded-lg shadow-xl" />
                <img src="/img/b3.jpg" alt="" className="rounded-lg shadow-xl" />
              </div>


            </div>
          </div>
        </div>
      </section>
      {/* <DangerMap /> */}
      <section className="px-4 pt-20 pb-48">
        <CameraScanner
          onSearch={(img) => setImages(img)}
          onImageUpload={(img) => setImages(img)}
          onScanResults={(results) => setScanResults(results)}
        />

        {scanResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-6 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-xl  flex flex-col items-center space-y-4 w-full "
          >


            <h3 className="text-lg font-bold text-black drop-shadow-md">
              Résultat du scan :
            </h3>

            <p className="text-xl font-semibold text-blue-300 drop-shadow-lg">
              {scanResults[0].nom}
            </p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-lg hover:shadow-2xl transition-all"
              onClick={() => setScanResults([])}
            >
              Fermer
            </motion.button>
            
          </motion.div>
        )}
      </section>

          <SideModal isOpen={isOpen} setIsOpen={setIsOpen} />
   
      <div>
        <DangerMap />
      </div>
      {isModalOpen && (
        <Modal setIsModalOpen={toggleModal} /> // Passe la fonction de fermeture en prop
      )}
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
