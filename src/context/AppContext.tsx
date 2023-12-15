import React, { createContext, useState, ReactNode } from "react";
import Image from "../Entities/Image";

export interface AppContextProps { 
  user: string,
  images: Image[];
  addUser: (newUser: string) => void;
  addImage: (newImage: Image) => void;
  removeImage: (image: Image) => void;
  toggleImage: (image: Image) => void;
  existImage: (id: number) => boolean;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [user, setUser] = useState("");

  const addImage = (newImage: Image) => {
    setImages([...images, newImage]);
  };

  const removeImage = (image: Image) => {
    setImages((prev) => prev.filter((img) => img.id !== image.id));
  };

  const toggleImage = (image: Image) => {
    if (images.some((img) => img.id === image.id)) {
      removeImage(image);
    } else {
      addImage(image);
    }
  };

  const addUser = (newUser: string) => {
    setUser(newUser);
  };

  const existImage = (id: number) => {
    return images.some(x => x.id === id);
  };

  return (
    <AppContext.Provider value={{ images, user, addImage, removeImage, toggleImage, existImage, addUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
