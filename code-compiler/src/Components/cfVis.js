import React, { useState } from "react";
import { useEffect } from "react";

import axios from 'axios';

// importng chart wale components
import PieLang from "./langPie";
import PieVerdict from "./verdictPie";
import BarProblems from "./probBar";
import DoughnutTags from "./tagsDoughnut";
import Table from "./table";
import Card from "./card";

const apiUrl1 = "https://codeforces.com/api/user.status?handle=";
const apiUrl2 = "https://codeforces.com/api/user.rating?handle=";
const apiUrl3 = "https://codeforces.com/api/user.info?handles=";
const url = "https://codeforces.com/api/user.info?handles=";

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function Cfvis(){

    const [submissions,setSubmissions] = useState();
    const [flag, setFlag] = useState(false);
    const [contest,setContest] = useState();
    const [info,setInfo] = useState();
    const [text, settext] = useState('');
    const [carddata, setcarddata] = useState([]);

    useEffect(() => {
        const fetchDetails = () => {
            axios.get(url+text).then((res) => setcarddata(res.data.result[0]));
            axios.get(apiUrl1 + text).then((res) => setSubmissions(res.result));
            axios.get(apiUrl2 + text).then((res) => setContest(res.result));
            axios.get(apiUrl3 + text).then((res) => setInfo(res.result));
        };
        fetchDetails();
    }, [flag]);

    // For Bar chart
    const getUnsolvedProblems = () => {
        const submission = submissions
        .filter(c => c.verdict !== "OK")
        .map(c => c.id);
        console.log(submission);
        return submission;
    };

    // For Language Pie chart
    const programLang = () => {
        const plang = submissions.map(p => p.programmingLanguage);
        let counts = {};
        for (let i = 0; i < plang.length; i++) {
          let num = plang[i];
          counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
          // console.log(counts);
        return counts;
    };

    // For Bar chart
    const probIndex = () => {
       const submission = submissions.filter(c => c.verdict === "OK");
       const pindex = submission.map(p => p.problem.index);
       let counts = {};
       for (let i = 0; i < pindex.length; i++) {
         let num = pindex[i];
         counts[num] = counts[num] ? counts[num] + 1 : 1;
       }
       return counts;
    };

    // For Verdict Pie chart
    const programVerdict = () => {
       const pverdict = submissions.map(p => p.verdict);
       let counts = {};
       for (let i = 0; i < pverdict.length; i++) {
           let num = pverdict[i];
           counts[num] = counts[num] ? counts[num] + 1 : 1;
       }
       return counts;
    };

    // Tags for Doughnut
    const programtags = () => {
        let tags = submissions.map(p => p.problem.tags);
        tags = [].concat.apply([], tags);
        let counts = {};
        for (let i = 0; i < tags.length; i++) {
           let num = tags[i];
           counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        return counts;
    };



    return(

        <div>

            Hello

             <form action="">
                <input type="text" value={text} onChange={(event)=>{settext(event.target.value)}} placeholder='Search'/>
                <button type='Button' onClick={() => setFlag(!flag)}>Submit</button>
            </form>

            <Card firstName={carddata.firstName} maxRank={carddata.maxRank} maxRating={carddata.maxRating}/>
            { flag &&  <Table
            user={text}
            submissions={submissions}
            contests={contest}
            userInfo={info}
             />}

        </div>

    );

}


