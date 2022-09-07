import { useState } from "react";

const VoteButton = ({ onVoteClickHandler }) => {
  return <button onClick={onVoteClickHandler}>vote</button>;
};

const NextButton = ({ onNextClickHandler }) => {
  return <button onClick={onNextClickHandler}>next anecdote</button>;
};

const AnecdoteText = ({ text, votes }) => {
  return (
    <>
      {text}
      <p>has {votes} votes</p>
    </>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { anecdote: "If it hurts, do it more often.", votes: 0 },
    {
      anecdote: "Adding manpower to a late software project makes it later!",
      votes: 0,
    },
    {
      anecdote:
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
    },
    {
      anecdote:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0,
    },
    {
      anecdote: "Premature optimization is the root of all evil.",
      votes: 0,
    },
    {
      anecdote:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0,
    },
    {
      anecdote:
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      votes: 0,
    },
  ]);

  const [selected, setSelected] = useState(0);

  const onVoteClick = () => {
    let copyAnecdotes = [...anecdotes];
    copyAnecdotes[selected].votes += 1;
    setAnecdotes(copyAnecdotes);
  };

  // let topVoteCount = 0;
  // let topAnecdote = anecdotes.forEach(anecdote => {if (anecdote.votes > topVoteCount) {
  //   topVoteCount
  // } })
  let topVoteCount = Math.max(...anecdotes.map((anecdote) => anecdote.votes));
  let topAnecdote = anecdotes.filter(
    (anecdote) => anecdote.votes === topVoteCount
  )[0];

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteText
        text={anecdotes[selected].anecdote}
        votes={anecdotes[selected].votes}
      />
      <br />
      <VoteButton onVoteClickHandler={onVoteClick} />
      <NextButton
        onNextClickHandler={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      />
      <h1>Anecdote with most votes</h1>
      <AnecdoteText text={topAnecdote.anecdote} votes={topAnecdote.votes} />
    </div>
  );
};

export default App;
