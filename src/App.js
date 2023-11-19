import { useState } from "react";
import "./App.css";
import { mediaData } from "./data/info.js";
import { filter } from "./data/sort.js";

import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";

function App() {
  const [name, setName] = useState("");
  const [click, setClick] = useState(true);

  const [file, setFile] = useState("");
  const [isLike, setisLike] = useState(false);
  const [ren, setRender] = useState([{}]);

  function setd() {
    setRender(mediaData);
    setClick(false);
  }

  function Changed(name) {
    console.log(name);
    console.log(ren);

    setRender(mediaData.filter((e) => e.name.includes(name)));
    if (name === "Trending")
      setRender(mediaData.filter((md) => md.trending === true));
    else if (name === "Toplikes") {
      setRender(mediaData.filter((md) => md.likes > 34));
    } else if (name === "Popular") {
      setRender(mediaData.filter((md) => md.popular > 2));
    } else if (name === "Old") {
      const d = new Date();
      let month = d.getMonth();
      console.log(month);
      setRender(mediaData.filter((md) => month !== md.month));
    }
    console.log(ren);
  }
  /*increment the like*/

  function ILike(ll) {
    console.log(ll);
    if (isLike === false) ll.likes += 1;
    //setFind("" + ll.likes);
    setisLike(true);

    console.log(ll.likes);
  }

  /*decrement the like*/

  function DLike(ll) {
    console.log(ll);
    //setFind("" + ll.likes);
    if (ll.likes !== 0 && isLike === true) ll.likes -= 1;
    //console.log(ll.likes);
    setisLike(false);
  }

  return (
    <div
      className="App"
      onClick={() => {
        file && setFile(null);
      }}
    >
      <div
        className="popup"
        style={{
          display: file ? "block" : "none",
        }}
      >
        <span>&times;</span>
        {file && <img src={file} alt="aa" width="95%" className="popup-img" />}
      </div>
      <div className="nav">
        <div>
          <h3 className="de" onClick={() => setd()}>
            TRI
          </h3>
        </div>
        {/*search bar */}
        <div className="dropdown">
          <input
            type="search"
            placeholder="search"
            className="searchbar"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="dropdown-content">
            {mediaData.map((md) => (
              <div onClick={() => Changed(name)}>
                {name.length > 0 && md.name.includes(name.toLowerCase())
                  ? md.name
                  : " "}
              </div>
            ))}
          </div>
        </div>
        <div>
          {/*sort menu */}
          <div className="dropdown2">
            <h3 className="de">Sort</h3>
            <div className="dropdown-contentt">
              {filter.map((sd) => (
                <div
                  id={sd.id}
                  onClick={() => Changed(sd.type)}
                  className="sort"
                >
                  {sd.type}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*body part */}
      <div className="body">
        <div>{!click || <h2>click TRI</h2>}</div>
        <div className="content">
          {click
            ? mediaData.map((e) => (
                <div className="card">
                  <img
                    src={e.img}
                    alt="aa"
                    width="100%"
                    height="90%"
                    onClick={() => setFile(e.img)}
                  />
                  <div className="card-text">
                    <div>{e.name}</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "4px",
                      }}
                    >
                      <SlLike onClick={() => ILike(e)} className="thumb" />
                      <SlDislike onClick={() => DLike(e)} className="thumb2" />
                      <div style={{ display: "inline", paddingLeft: "8px" }}>
                        {e.likes}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : ren.map((e) => (
                <div className="card">
                  <img
                    src={e.img}
                    alt="aa"
                    width="100%"
                    height="90%"
                    onClick={() => setFile(e.img)}
                  />
                  <div className="card-text">
                    <div>{e.name}</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "4px",
                      }}
                    >
                      <SlLike onClick={() => ILike(e)} className="thumb" />
                      <SlDislike onClick={() => DLike(e)} className="thumb2" />
                      <div style={{ display: "inline", paddingLeft: "8px" }}>
                        {e.likes}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
