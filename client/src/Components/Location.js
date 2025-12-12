import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Location() {
  const [ip, setIp] = useState("Loading...");
  const [country, setCountry] = useState("Loading...");
  const [region, setRegion] = useState("Loading...");
  const [error, setError] = useState(null);

  const getGeoLocation = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCATION_API_URL}`);
      setIp(response.data.ip);
      setCountry(response.data.location.country);
      setRegion(response.data.location.region);
    } catch (err) {
      console.error("Failed to fetch location:", err);
      setError("Could not fetch location info");
      setIp("-");
      setCountry("-");
      setRegion("-");
    }
  };

  useEffect(() => {
    getGeoLocation();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h6>Ip Address: {ip}</h6>  
      <h6>Country: {country}</h6>  
      <h6>Region: {region}</h6>  
    </div>
  );
}

export default Location;
