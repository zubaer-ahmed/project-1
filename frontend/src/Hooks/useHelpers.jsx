async function getLocation() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          return resolve(position.coords);
        },
        (error) => {
          console.error(error);
          return resolve(null);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      return resolve(null);
    }
  });
}

function useHelpers() {
  return { getLocation };
}
export { useHelpers };
