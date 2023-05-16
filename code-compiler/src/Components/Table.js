import React, { useState } from "react";

const problemstried = (submissions) => {
  // we are storing data in set to get unique submissions only
  return [...new Set(submissions.data.result.map((p) => p.problem.name))]
    .length;
};

const problemsolved = (submissions) => {
  return submissions.data.result.filter((problems) => problems.verdict == "OK")
    .length;
};

const maxattempts = (submissions) => {
  var solved = submissions.data.result.filter(
    (problems) => problems.verdict === "OK"
  );
  var counts = {};
  var maxele = 1;
  for (var i = 0; i < solved.length; i++) {
    var num = solved[i].problem.name;
    counts[num] = counts[num] ? counts[num] + 1 : 1;
    maxele = Math.max(maxele, counts[num]);
  }
  // console.log(solved);
  return maxele;
};

const NumberofContests = (contest) => {
  return contest.data.result.length;
};

const BestRank = (contest) => {
  var minRank = 100000000;
  // console.log("In the function");
  for (var i = 0; i < contest.data.result.length; i++) {
    minRank = Math.min(minRank, contest.data.result[i].rank);
    // console.log(contest.data.result[i].rank);
  }
  return minRank;
};

const WorstRank = (contest) => {
  var maxRank = 0;
  // console.log("In the function");
  for (var i = 0; i < contest.data.result.length; i++) {
    maxRank = Math.max(maxRank, contest.data.result[i].rank);
    // console.log(contest.data.result[i].rank);
  }
  return maxRank;
};

export default function Table(props) {
  const CurrentRating = () => {
    var rank = props.info.data.result[0].rank;
    var col = "Gray";
    if (rank === "pupil") {
      col = "Green";
    } else if (rank === "specialist") {
      col = "Cyan";
    } else if (rank === "expert") {
      col = "Blue";
    } else if (rank === "candidate master") {
      col = "Violet";
    } else if (rank === "master" || rank === "international master") {
      col = "Orange";
    } else {
      col = "Red";
    }
    return { color: col };
  };
  const BestRating = () => {
    var rank = props.info.data.result[0].maxRank;
    var col = "Gray";
    if (rank === "pupil") {
      col = "Green";
    } else if (rank === "specialist") {
      col = "Cyan";
    } else if (rank === "expert") {
      col = "Blue";
    } else if (rank === "candidate master") {
      col = "Violet";
    } else if (rank === "master" || rank === "international master") {
      col = "Orange";
    } else {
      col = "Red";
    }
    return { color: col };
  };
  return (
    <div className="flex place-content-evenlyz">
      {/* problems table */}
      <div className="my-9 flex justify-center">
        <table className="border-2 border-black">
          <tbody>
            <tr className="bg-slate-700 text-white">
              <th className="px-5 py-3">Number of problems of </th>
              <th className="px-5 py-3">{props.user}</th>
            </tr>
            <tr className="hover:bg-slate-400">
              <td className="px-5 py-3">Tried</td>
              <td className="px-5 py-3">{problemstried(props.sub)}</td>
            </tr>
            <tr className="hover:bg-slate-400">
              <td className="px-5 py-3">Solved</td>
              <td className="px-5 py-3">{problemsolved(props.sub)}</td>
            </tr>
            <tr className="hover:bg-slate-400">
              <td className="px-5 py-3">Max Attempts</td>
              <td className="px-5 py-3">{maxattempts(props.sub)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* contest table  */}
      <div className="my-9 flex justify-center">
        <table className="border-2 border-black">
          <tbody>
            <tr className="bg-slate-700 text-white">
              <th className="px-5 py-3">Contests of </th>
              <th className="px-5 py-3">{props.user}</th>
            </tr>
            <tr className="hover:bg-slate-400">
              <td className="px-5 py-3">Number of Contests</td>
              <td className="px-5 py-3">{NumberofContests(props.contest)}</td>
            </tr>
            <tr className="hover:bg-slate-400">
              <td className="px-5 py-3">Best Rank</td>
              <td className="px-5 py-3">{BestRank(props.contest)}</td>
            </tr>
            <tr className="hover:bg-slate-400">
              <td className="px-5 py-3">Worst Rank</td>
              <td className="px-5 py-3">{WorstRank(props.contest)}</td>
            </tr>
            <tr className="hover:bg-slate-400">
              <td className="px-5 py-3">Current Rank</td>
              <td className="px-5 py-3" style={CurrentRating()}>
                {props.info.data.result[0].rating}
              </td>
            </tr>
            <tr className="hover:bg-slate-400">
              <td className="px-5 py-3">Best Rank</td>
              <td className="px-5 py-3" style={BestRating()}>
                {props.info.data.result[0].maxRating}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
