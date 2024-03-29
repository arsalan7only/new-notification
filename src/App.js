import logo from "./logo.svg";
import "./App.css";
import Notification from "./components/Notification";
import { requestForToken } from "./firebase";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [name, setName] = useState("");
  const [support, setSupport] = useState("");
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
  useEffect(() => {
    if ("Notification" in window) {
      // API supported
      setSupport("support");
    } else {
      // API not supported
      setSupport("not supported");
    }
  }, []);
  return (
    <div className="App">
      <h2>{"support" + support}</h2>
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button type="submit" class="btn btn-primary" onClick={handleClick}>
        Submit
      </button>
      <Notification />
    </div>
  );
}

export default App;
