import { useEffect, useState } from "react";
import "./App.css";
import { mediadata } from "./data/info.js";
import { filter } from "./data/sort.js";

import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";

function App() {
  const [name, setName] = useState("");
  const [data, setData] = useState([{}]);
  const [result, setResult] = useState("");
  const [find, setFind] = useState("");
  const [file, setFile] = useState("");
  const [isLike, setisLike] = useState(false);
  useEffect(() => {
    console.log(name);
    setData(mediadata.filter((e) => e.name.includes(result)));
    if (result === "Trending")
      setData(mediadata.filter((md) => md.trending === true));
    else if (result === "Toplikes") {
      setData(mediadata.filter((md) => md.likes > 34));
    } else if (result === "Popular") {
      setData(mediadata.filter((md) => md.popular > 2));
    } else if (result === "Old") {
      const d = new Date();
      let month = d.getMonth();
      console.log(month);
      setData(mediadata.filter((md) => month !== md.month));
    }
    console.log(result);
  }, [find, result, name]);

  function Changed() {}
  /*increment the like*/

  function ILike(ll) {
    console.log(ll);
    if (isLike === false) ll.likes += 1;
    setFind("" + ll.likes);
    setisLike(true);

    console.log(ll.likes);
  }

  /*decrement the like*/

  function DLike(ll) {
    console.log(ll);
    setFind("" + ll.likes);
    if (ll.likes !== 0 && isLike === true) ll.likes -= 1;
    console.log(ll.likes);
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
          background: file ? " rgb(0,0,0,0.8)" : "rgb(0, 0, 0, 0)",
        }}
      >
        <span>&times;</span>
        {file && <img src={file} alt="aa" width="95%" className="popup-img" />}
      </div>
      <div className="nav">
        <div>
          <h3 className="de">TRI</h3>
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
            {mediadata.map((md) => (
              <div onClick={() => setResult(name)}>
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
                  onClick={() => setResult(sd.type)}
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
        <div className="content">
          {result === ""
            ? mediadata.map((e) => (
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
            : data.map((e) => (
                <div className="card">
                  <img
                    src={e.img}
                    alt="aa"
                    width="100%"
                    height="90%"
                    onClick={() => console.log(e.img)}
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
