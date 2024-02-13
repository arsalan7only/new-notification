import logo from "./logo.svg";
import "./App.css";
import Notification from "./components/Notification";
import { requestForToken } from "./firebase";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const handleClick = async () => {
    const token = await requestForToken();
    const payload = {
      name: name,
      token: token,
    };
    // fetch("http://localhost:3006/api/v1/addtoken", {
    fetch("https://node-mongo-api-g1v4.onrender.com/api/v1/addtoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="name"
      />
      <button onClick={handleClick}>Call Me </button>
      <Notification />
    </div>
  );
}

export default App;
