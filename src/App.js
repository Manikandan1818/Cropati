import { useEffect, useMemo, useState } from "react";
import "./app.css";
import Quiz from "./components/Quiz";
import Start from "./components/Start";
import { Timer } from "./Timer";
import { data } from "./utils/data";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("₹ 0");

  const moneyPrymid = useMemo(
    () =>
      [
        { id: 1, amount: "₹ 100" },
        { id: 2, amount: "₹ 500" },
        { id: 3, amount: "₹ 1000" },
        { id: 4, amount: "₹ 5000" },
        { id: 5, amount: "₹ 10000" },
        { id: 6, amount: "₹ 25000" },
        { id: 7, amount: "₹ 50000" },
        { id: 8, amount: "₹ 75000" },
        { id: 9, amount: "₹ 100000" },
        { id: 10, amount: "₹ 500000" },
        { id: 11, amount: "₹ 1000000" },
        { id: 12, amount: "₹ 2500000" },
        { id: 13, amount: "₹ 5000000" },
        { id: 14, amount: "₹ 7500000" },
        { id: 15, amount: "₹ 10000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPrymid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPrymid, questionNumber]);

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">
                {username} earned : {earned}
              </h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Quiz
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="side">
            <ul className="moneyList">
              {moneyPrymid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
