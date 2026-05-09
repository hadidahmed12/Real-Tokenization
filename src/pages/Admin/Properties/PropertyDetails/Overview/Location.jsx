import React, { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_GEOCODING_API_KEY;
const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const Location = ({ location }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const loadGoogleMapsScript = () => {
    return new Promise((resolve, reject) => {
      if (typeof google !== "undefined") {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const getCoordinates = async (location) => {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { lat, lng };
    } else {
      throw new Error("Location not found");
    }
  };

  // Function to initialize the map
  const initMap = (lat, lng) => {
    const location = { lat, lng };
    const newMap = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: location,
    });
    const newMarker = new google.maps.Marker({
      position: location,
      map: newMap,
    });
    setMap(newMap);
    setMarker(newMarker);
  };

  useEffect(() => {
    if (location !== "-") {
      const showMap = async () => {
        try {
          await loadGoogleMapsScript();
          const coords = await getCoordinates(location);
          initMap(coords.lat, coords.lng);
        } catch (error) {
          console.log("ERROR", error);
        }
      };
      showMap();
    }
  }, [location]);

  return (
    <div>
      <h2 className="regulteh2 pt-5">Location</h2>
      <div className="d-flex mt-3">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1.5C9.81276 1.50258 7.71584 2.3726 6.16922 3.91922C4.62261 5.46584 3.75259 7.56276 3.75001 9.75C3.74799 11.5373 4.33179 13.276 5.41201 14.7C5.41201 14.7 5.63701 14.9963 5.67376 15.039L12 22.5L18.3293 15.0353C18.3623 14.9955 18.588 14.7 18.588 14.7L18.5888 14.6978C19.6682 13.2743 20.2517 11.5365 20.25 9.75C20.2474 7.56276 19.3774 5.46584 17.8308 3.91922C16.2842 2.3726 14.1872 1.50258 12 1.5ZM12 12.75C11.4067 12.75 10.8266 12.5741 10.3333 12.2444C9.83995 11.9148 9.45543 11.4462 9.22837 10.8981C9.0013 10.3499 8.94189 9.74667 9.05765 9.16473C9.1734 8.58279 9.45913 8.04824 9.87868 7.62868C10.2982 7.20912 10.8328 6.9234 11.4147 6.80764C11.9967 6.69189 12.5999 6.7513 13.1481 6.97836C13.6962 7.20542 14.1648 7.58994 14.4944 8.08329C14.8241 8.57664 15 9.15666 15 9.75C14.999 10.5453 14.6826 11.3078 14.1202 11.8702C13.5578 12.4326 12.7953 12.749 12 12.75Z"
            fill="#BE170F"
          />
        </svg>
        <div className="ml-2 mb-2">
          <p className="oiuytre34567">{location || "-"}</p>
        </div>
      </div>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>

      {/* <textarea rows="6" className="textarea765678 mt-3"></textarea> */}
      {/* <p className="redgultedettxt pt-3">
        Mohammed Bin Rashid City is Dubai’s luxury urban oasis, and is one of
        the largest mixed-use developments in the UAE. This city within a city
        offers high-end residential communities, vibrant commercial hubs, and
        the world&apos;s largest man-made lagoon, as well as various eateries,
        entertainment centres and retail shops. With many more futuristic
        developments coming up, MBR City has proven to be a community with a
        bustling environment in an ultra-modern setting.
      </p> */}
    </div>
  );
};

export default Location;
