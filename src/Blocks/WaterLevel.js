import React from "react";

export default function WaterLevel() {
  const cors = "https://cors-anywhere.herokuapp.com/";
  React.useEffect(() => {
    fetch(`${cors}https://tinyurl.com/2yhzsjpv`)
      .then((response) => response.json())
      .then((data) => console.log(data));
    fetch(`${cors}https://tinyurl.com/2yhzsjpv`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return <div></div>;
}
