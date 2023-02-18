import React from "react";

export default function Pump() {
  const cors = "https://cors-anywhere.herokuapp.com/";

  const [pumps, setPumps] = React.useState([]);

  React.useEffect(() => {
    fetch(`${cors}https://tinyurl.com/2yhzsjpv`)
      .then((response) => response.json())
      .then((data) => {
        let open = 0;
        let close = 0;
        const pumps = data.count;
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].allPumbLights === "-") {
            close += 1;
          } else {
            open += 1;
          }
        }
        setPumps([
          Math.floor((close / pumps) * 100),
          Math.floor((open / pumps) * 100),
        ]);
      });
  }, []);

  return <div>{pumps.length !== 0 && pumps}</div>;
}
