import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { ladders } from "./data";

const LadderA= () => {
  const [username, setUsername] = useState("Mike Mark... Thank U for CF");
  const [details, setDetails] = useState();
  const [division, setDivision] = useState(ladders.div_a);

  const [flag, setFlag] = useState(false);

  const count = useRef(0);

  const arr = [];

  useEffect(() => {
    const fetchDetails = () => {
      const url = "https://codeforces.com/api/user.status?handle=" + username;
      axios.get(url).then((res) => setDetails(res));
    };

    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  return (
    <>
      {/*{details && console.log(details)}*/}
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-center">
          <h1>AAA LADDER</h1>
        </div>
        {/* <div className='d-flex justify-content-center'>
            <p style={{fontSize: '25px'}}>Solved - {count.current}</p>
            <hr/>
        </div> */}

        <div className="input-group mb-5 mt-3 shadow bg-body rounded">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="btn btn-info"
            type="button"
            onClick={() => setFlag(!flag)}
          >
            Go!
          </button>
        </div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => setDivision(ladders.div_a)}
            >
              Div A
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => setDivision(ladders.div_b)}
            >
              Div B
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => setDivision(ladders.div_c)}
            >
              Div C
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => setDivision(ladders.div_d)}
            >
              Div D
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => setDivision(ladders.div_e)}
            >
              Div E
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => setDivision(ladders.div_1d)}
            >
              Div F
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => setDivision(ladders.div_1e)}
            >
              Div G
            </button>
          </li>
        </ul>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">{(count.current = 0)}</th>
              <th scope="col">Problem</th>
              <th className="d-flex justify-content-center" scope="col">
                Solved!
              </th>
            </tr>
          </thead>

          <tbody>
            {division.map((prob, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{prob[0]}</th>
                  <td>
                    <a
                      href={
                        "https://codeforces.com/problemset/problem/" +
                        prob[2] +
                        "/" +
                        prob[3]
                      }
                    >
                      {" "}
                      {prob[1]}{" "}
                    </a>
                  </td>

                  {details &&
                    details.data.result.map((item) => {
                      if (
                        item.problem.contestId.toString() === prob[2] &&
                        item.problem.index.toString() === prob[3] &&
                        item.verdict === "OK" &&
                        !arr.includes(item.problem.contestId.toString())
                      ) {
                        arr.push(item.problem.contestId.toString());
                        count.current += 1;
                        return (
                          <td className="table-success">
                            {/*{console.log('arr',arr)}*/}
                            <div className="d-flex justify-content-center">
                              <i className="bi bi-check2" />
                            </div>
                          </td>
                        );
                      }
                      return <></>;
                    })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LadderA;
