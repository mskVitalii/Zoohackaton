import React from "react";

import styles from "./map.css";
import fire from "./assets/fire.svg";
// import animals from "./assets/pug.png";

function WarnMap() {
  function appearWarnPage(e) {
    document.querySelector(".warn-page").style.height = "100vh";
    document.querySelector(".text-input").value = window.address;
  }
  function disappearWarnPage(e) {
    document.querySelector(".warn-page").style.height = "0vh";
  }
  async function onFileInput(e) {
    let formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    try {
      let r = await fetch("https://poach-server.herokuapp.com/", {
        method: "POST",
        body: formData,
      });
      let json = await r.json();
      let possibility = json.possibility;
      document.querySelector('.possibility').innerText = possibility;
      console.log("HTTP response code:", json);
    } catch (e) {
      console.log("Huston we have problem...:", e);
    }
  }
  return (
    <div className="container">
      <div id="map" className="map"></div>
      <div className="panel">
        <button className="btn" onClick={appearWarnPage}>
          <img src={fire} alt="alert button"></img>
        </button>
      </div>
      <div className="warn-page">
        <button onClick={disappearWarnPage} className="btn-back">
          To the map
        </button>
        <form>
          <label className="file-label">
            <span className="file-span">Choose file</span>
            <input type="file" className="file" onInput={onFileInput}></input>
          </label>
          <label className="text-label">
            <p className="p-address">Address:</p>
            <input type="text" className="text-input"></input>
          </label>
          <p className="p-possibility">
            Possibility <br />
            <span className="possibility"></span>
            <br />
          </p>
          <button className="btn-send" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default WarnMap;
