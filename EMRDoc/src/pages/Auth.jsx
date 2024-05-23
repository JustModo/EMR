import React, { useContext, useState } from "react";
import green from "@assets/blue3.png";
import ImageCar from "../components/ImageCar";
import LoginCard from "../components/LoginCard";
import RegisterCard from "../components/RegisterCard";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/global.css";

export default function Auth() {
  const [isLogin, setisLogin] = useState(true);

  const handleToggle = () => {
    setisLogin(!isLogin);
  };

  return (
    <div
      className="mycontainer bg-cover bg-center flex items-center justify-center flex-row"
      style={{ backgroundImage: `url(${green})` }}
    >
      <AnimatePresence mode={"wait"}>
        {isLogin ? (
          <>
            <motion.div
              key={"login"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.1 }}
              transition={{ duration: 0.2 }}
              className="w-11/12 h-3/4 flex flex-row items-center justify-center"
            >
              <div className="w-1/3 h-full bg-white flex items-center justify-start rounded-tl-2xl rounded-bl-2xl bg-opacity-50 backdrop-blur-xl shadow-2xl min-w-80 min-h-80 overflow-hidden flex-col">
                <ImageCar />
              </div>
              <div className="w-1/4 h-full bg-white flex items-center justify-start rounded-tr-2xl rounded-br-2xl bg-opacity-50 backdrop-blur-xl shadow-2xl min-w-80 min-h-80 p-10 flex-col">
                <LoginCard parentFunc={handleToggle} />
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            key={"register"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.1 }}
            transition={{ duration: 0.2 }}
            className="h-3/4 bg-white flex items-center justify-start rounded-badge shadow-2xl p-10 flex-col overflow-y-scroll hide-scrollbar"
            style={{ width: "800px" }}
          >
            <RegisterCard parentFunc={handleToggle} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
