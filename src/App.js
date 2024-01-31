import React, { useState, useEffect } from "react";

import "./App.css";
const App = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const Loader = ({ className }) => (
    <div className={className}>
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231   0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475   2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464    1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
          stroke="white"
        />
      </svg>
    </div>
  );

  const Button = ({ onSubmit, text, loading = false, disabled }) => {
    return (
      <button className="submit-btn" onClick={onSubmit} disabled={disabled}>
        {!loading ? text : <Loader className="spinner" />}
      </button>
    );
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          if (registration.pushManager) {
            return registration.pushManager.getSubscription();
          }
          throw new Error("PushManager not available");
        })
        .then((subscription) => {
          if (subscription === null) {
            subscribeUser();
          }
        })
        .catch((error) => {
          console.error("Error checking pushManager:", error);
        });
    }
  }, []);

  const subscribeUser = async () => {
    console.log("i am call");
    try {
      const registration = await navigator.serviceWorker.ready;
      const convertedVapidKey = urlBase64ToUint8Array(
        "BKdeaCCBxk3lnIJGRRHlhxKcF1kDyFiWeh0YX0Pfr6rXaPTEDWmL-E-h6vmbIXJntVnEhBNx6Y9QmBcbP5MyWAo"
      );

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });
      console.log("User is subscribed:", subscription);
      return subscription;
    } catch (error) {
      console.error("Failed to subscribe the user:", error);
    }
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    let test = await subscribeUser();
    console.log("test", test);
    let payload = {
      username,
      password,
      token: test,
    };
    fetch("https://node-mongo-api-g1v4.onrender.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.status == 200 && res.data !== "inviled credential") {
        setIsLoggedIn(true);
      }
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      console.log("test", res);
    });
  };
  return (
    <div className="App">
      {!isLoggedIn ? (
        <div class="container">
          <div class="card">
            <h2>Login 2</h2>
            <form>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                text="Submit"
                onSubmit={handleSubmit}
                loading={showLoader}
                disabled={showLoader}
              />
              {/* <button onClick={(e) => handleSubmit(e)}>Login</button> */}
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h3>
            Welcome <br></br>PWA Notification
          </h3>
        </div>
      )}
    </div>
  );
};

export default App;
