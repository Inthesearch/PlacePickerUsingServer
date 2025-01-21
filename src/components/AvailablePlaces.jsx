import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../https.js";
import { useFetch } from "../hooks/useFetch.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    fetchedData: availablePlaces,
    isError: error,
    setFetchData,
  } = useFetch(fetchAvailablePlaces, []);

  navigator.geolocation.getCurrentPosition((position) => {
    const sortedPlaces = sortPlacesByDistance(
      availablePlaces,
      position.coords.latitude,
      position.coords.longitude
    );
    setFetchData(sortedPlaces);
  });

  if (error) {
    return <Error title="An error occured" message={error.message}></Error>;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching places to pick."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
