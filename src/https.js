export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  if (!response.ok) {
    throw new Error("Places failed to load.");
  }
  const resValue = await response.json();
  return resValue.places;
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  if (!response.ok) {
    throw new Error("Places failed to load.");
  }
  const resValue = await response.json();
  return resValue.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resValue = await response.json();

  if (!response.ok) {
    throw new Error("Failed to save user picked places");
  }
  return resValue.message;
}
