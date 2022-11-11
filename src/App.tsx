import { useState } from "react";
import "./App.css";
import "antd/dist/antd.min.css";
import { Carousel } from "antd";
import Pictrue from "./components/Pictrue";
import Pixel from "./components/Pixel";
import ThreeD from "./components/ThreeD";

function App() {
  const [showPic, setshowPic] = useState(true);
  const contentStyle: React.CSSProperties = {
    height: "100vh",
    width: "100%",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <div className="App">
      {showPic ? (
        <Pictrue onSet={(boo) => setshowPic(boo)} />
      ) : (
        <ThreeD onSet={(boo) => setshowPic(boo)} />
      )}

      {/* <Carousel dotPosition="right">
        <div style={contentStyle}>
        
        </div>
        <div style={contentStyle}>
          <Pixel />
        </div>
        <div style={contentStyle}>
          <ThreeD />
        </div>
      </Carousel> */}
    </div>
  );
}

export default App;
