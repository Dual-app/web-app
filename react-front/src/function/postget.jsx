import { useState, useEffect } from "react";
import axios from "axios";

export function usePostGet() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    axios
      .get(
        window.location.hostname === "localhost"
          ? "http://localhost:5000/api/hello"
          : "https://media-blog-backend.up.railway.app/api/hello"
      )
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return apiData;
}
