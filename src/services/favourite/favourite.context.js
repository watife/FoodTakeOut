import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const FavouritesContext = createContext();

export const FavouriteContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [favourites, setFavourites] = useState([]);

  const saveFavouritesToStorage = async (value, uid) => {
    try {
      await AsyncStorage.setItem(`@favourites-${uid}`, JSON.stringify(value));
    } catch (e) {
      console.log("error saving to storage", e);
    }
  };

  const getFavouritesFromStorage = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${uid}`);
      if (value !== null) {
        setFavourites(JSON.parse(value));
        // value previously stored
      }
    } catch (e) {
      console.log("error getting from storage", e);
    }
  };

  const add = (restaurant) => {
    setFavourites([...favourites, restaurant]);
  };

  const remove = (restaurant) => {
    const newFavourites = favourites.filter(
      (fav) => fav.placeId !== restaurant.placeId
    );

    setFavourites(newFavourites);
  };

  useEffect(() => {
    if (user && user.uid && favourites.length) {
      saveFavouritesToStorage(favourites, user.uid);
    }
  }, [favourites, user]);

  useEffect(() => {
    if (user && user.uid) {
      getFavouritesFromStorage(user.uid);
    }
  }, [user]);
  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
