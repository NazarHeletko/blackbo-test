import React, { useEffect, useState } from "react";
import styles from "./Exchange.module.css";

function Exchange() {
  const [option, setOption] = useState("sell");
  const [exchange, setExchange] = useState(0);
  const [input, setInput] = useState(0);
  const [sellValue, setSellValue] = useState(0);
  const [buyValue, setBuyValue] = useState(0);

  const handleChangeOption = (e: any) => {
    setOption(e.target.value);
  };

  const handleChangeInput = (e: any) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    setSellValue(input * exchange);
  }, [input]);

  useEffect(() => {
    setBuyValue(input * exchange);
  }, [input]);

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
    <div className={styles.wrapper}>
      <p>ETH amount</p>
      <input type="number" value={input} onChange={handleChangeInput} />
      <p>Action</p>
      <select value={option} onChange={handleChangeOption}>
        <option value="sell">sell</option>
        <option value="buy">buy</option>
      </select>
      <div className={styles.result}>
        {option === "sell" && <span>You will receive {sellValue} $</span>}
        {option === "buy" && <span>You will spend {buyValue} $</span>}
      </div>
    </div>
  );
}

export default Exchange;
