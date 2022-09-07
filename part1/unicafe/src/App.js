import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const FeedbackButton = ({ name, onClickHandler }) => {
  return <button onClick={onClickHandler}>{name}</button>;
};

const Statistics = ({ stats }) => {
  return (
    <>
      {stats.all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <table>
            <tbody>
              <StatisticLine text={"good"} value={stats.good} />
              <StatisticLine text={"neutral"} value={stats.neutral} />
              <StatisticLine text={"bad"} value={stats.bad} />
              <StatisticLine text={"all"} value={stats.all} />
              <StatisticLine text={"average"} value={stats.average} />
              <StatisticLine text={"positive"} value={stats.positive} />
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onClickHandler = {
    good: () => setGood(good + 1),
    neutral: () => setNeutral(neutral + 1),
    bad: () => setBad(bad + 1),
  };

  const scores = {
    good: 1,
    neutral: 0,
    bad: -1,
  };

  let allFeedbackCount = good + neutral + bad;

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: allFeedbackCount,
    average:
      allFeedbackCount === 0
        ? 0
        : (good * scores.good + neutral * scores.neutral + bad * scores.bad) /
          allFeedbackCount,
    positive: good === 0 ? good : (good / allFeedbackCount) * 100 + "%",
  };

  return (
    <div>
      <h1>give feedback</h1>
      <FeedbackButton name={"good"} onClickHandler={onClickHandler.good} />
      <FeedbackButton
        name={"neutral"}
        onClickHandler={onClickHandler.neutral}
      />
      <FeedbackButton name={"bad"} onClickHandler={onClickHandler.bad} />
      <h1>statistics</h1>
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
