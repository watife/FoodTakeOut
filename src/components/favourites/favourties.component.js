import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import { FavouritesContext } from "../../services/favourite/favourite.context";

const FavouriteButton = styled(TouchableOpacity)`
  background-color: transparent;
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 1;
`;

export const Favourites = ({ restaurant }) => {
  const { favourites, addToFavourites, removeFromFavourites } = useContext(
    FavouritesContext
  );

  const isFavourite = favourites.find(
    (fav) => fav.placeId === restaurant.placeId
  );

  const handleFavourites = () => {
    isFavourite
      ? removeFromFavourites(restaurant)
      : addToFavourites(restaurant);
  };
  return (
    <FavouriteButton onPress={() => handleFavourites()}>
      <AntDesign name="heart" size={24} color={isFavourite ? "red" : "white"} />
    </FavouriteButton>
  );
};
