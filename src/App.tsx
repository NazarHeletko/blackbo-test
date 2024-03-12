import React, { useEffect, useState } from "react";
import "./App.css";
import Exchange from "./components/Exchange";

function App() {
  const [exchange, setExchange] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@trade");



    ws.onmessage = (event) => {

        const data = JSON.parse(event.data);
        setExchange(data.p);

    };

    
    return () => {
      ws.close();

    };
  }, []);
  return (
    <div className="App">
      <Exchange/>
    </div>
  );
}

export default App;
