import React, { useEffect, useState } from "react";
import styles from "./Exchange.module.css";

function Exchange() {
  const [option, setOption] = useState("sell");
  const [exchange, setExchange] = useState({ bit: 0, ask: 0 });
  const [input, setInput] = useState(0);
  const [sellValue, setSellValue] = useState(0);
  const [buyValue, setBuyValue] = useState(0);

  const handleChangeInput = (e: any) => {
    setInput(e.target.value >= 0 ? e.target.value : 0);
  };

  const handleChangeOption = (e: any) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    const countedSell = input*exchange.bit
    setSellValue(Number(countedSell.toFixed(2)))
  }, [exchange]);

  useEffect(() => {
    const countedBuy = input*exchange.ask
    setBuyValue(Number(countedBuy.toFixed(2)))
  }, [exchange]);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/ethusdt@bookTicker"
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setExchange({ bit: data.b, ask: data.a });
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
        {option === "sell" && <><p>You will receive</p> <span>{sellValue} $</span></>}
        {option === "buy" && <><p>You will spend</p> <span>{buyValue} $</span></>}
      </div>
    </div>
  );
}

export default Exchange;
