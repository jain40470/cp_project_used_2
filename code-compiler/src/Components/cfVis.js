import React, { useRef, useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import Table from "./Table";
import PieLang from "./pieLang";

const apiUrl1 = "https://codeforces.com/api/user.status?handle=";
const apiUrl2 = "https://codeforces.com/api/user.rating?handle=";
const apiUrl3 = "https://codeforces.com/api/user.info?handles=";

export default function Cfvis() {
  const [skipstate, setskipstate] = useState(false);
  const [submissions, setSubmissions] = useState();
  const [flag, setFlag] = useState(false);
  const [contest, setContest] = useState();
  const [info, setInfo] = useState();
  const [text, settext] = useState("");

  useEffect(() => {
    const fetchDetails = () => {
      axios
        .get(apiUrl1 + text)
        .then((result) => setSubmissions(result))
        .catch((error) => {
          console.log("Please try again");
        });
      axios
        .get(apiUrl2 + text)
        .then((result) => setContest(result))
        .catch((error) => {
          console.log("Please try again");
        });
      axios
        .get(apiUrl3 + text)
        .then((result) => setInfo(result))
        .catch((error) => {
          console.log("Please try again");
        });
    };
    if (skipstate) {
      fetchDetails();
    } else {
      setskipstate(true);
    }
    // console.log(submissions);
    // console.log(contest);
    console.log(info);
  }, [flag]);

  // For Bar chart
  const getUnsolvedProblems = () => {
    const submission = submissions.data.result
      .filter((c) => c.verdict !== "OK")
      .map((c) => c.id);
    console.log(submission);
    return submission;
  };

  // For Language Pie chart
  const programLang = () => {
    // Gives the programming language of user in plang
    const plang = submissions.data.result.map((p) => p.programmingLanguage);
    let counts = {};
    for (let i = 0; i < plang.length; i++) {
      let num = plang[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    // counts stores the programming language used and its frequency
    console.log(counts);
    return counts;
  };

  // For Bar chart
  const probIndex = () => {
    // submission array contains submissions which are accepted
    const submission = submissions.data.result.filter(
      (c) => c.verdict === "OK"
    );
    // it takes the indexes of problems(from submission[accepted problems]) in pindex(for eg. A,B,C etc..)
    const pindex = submission.map((p) => p.problem.index);
    var counts = {};
    for (let i = 0; i < pindex.length; i++) {
      var num = pindex[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    // counts will store the frequency of a particular index problem solved
    console.log(counts);
    return counts;
  };

  // For Verdict Pie chart
  const programVerdict = () => {
    const pverdict = submissions.data.result.map((p) => p.verdict);
    let counts = {};
    for (let i = 0; i < pverdict.length; i++) {
      let num = pverdict[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    //         counts will store the frequency of a particular verdict(
    //             for eg
    //                 {
    //                     COMPILATION_ERROR : 206
    //                     MEMORY_LIMIT_EXCEEDED: 34
    //                     OK : 1033
    //                  }
    //          )
    console.log(counts);
    return counts;
  };

  // Tags for Doughnut
  const programtags = () => {
    let tags = submissions.data.result.map((p) => p.problem.tags);
    tags = [].concat.apply([], tags);
    let counts = {};
    for (let i = 0; i < tags.length; i++) {
      let num = tags[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    console.log(counts);
    // counts stores the number of problems of different tags(for eg Binary Search-1)
    return counts;
  };

  return (
    <>
      <div>
        <form action="">
          <input
            type="text"
            value={text}
            onChange={(event) => {
              settext(event.target.value);
            }}
            placeholder="Search"
          />
          <button
            type="Button"
            onClick={() => {
              setFlag(!flag);
              if (submissions != undefined) {
                programtags();
              }
            }}
          >
            Submit
          </button>
        </form>
      </div>
      {submissions != undefined && (
        <Table user={text} sub={submissions} contest={contest} info={info} />
      )}
      {submissions != undefined && <PieLang data={programLang()} />}
    </>
  );
}
