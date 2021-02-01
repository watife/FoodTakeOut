import React from "react";
import { CompactRestaurantInfo } from "../../../components/restaurant/compact-restaurant-info";

export const MapCallout = ({ restaurant }) => {
  return <CompactRestaurantInfo restaurant={restaurant} isMap />;
};
