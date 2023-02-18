import React from "react";

export default function Rain() {
  const cors = "https://cors-anywhere.herokuapp.com/";

  const [topRain, setTopRain] = React.useState([]);

  function warningCode(value) {
    if (value > 100) {
      return "red";
    } else if (value > 85) {
      return "orange";
    } else if (value > 60) {
      return "gold";
    } else {
      return "green";
    }
  }

  const output = topRain.map((item) => (
    <div>
      <div>{warningCode(item.rain)}</div>
      <p>
        {item.stationName}：{item.rain}
      </p>
    </div>
  ));

  React.useEffect(() => {
    fetch(`${cors}https://tinyurl.com/j9t6jxds`)
      .then((response) => response.json())
      .then((data) => {
        let array = data.data;
        array.sort((a, b) => {
          return b.rain - a.rain;
        });
        let arrayOutput = array.splice(0, 10);
        setTopRain(arrayOutput);
      });
  }, []);

  return <div>{topRain.length !== 0 && output}</div>;
}
