const Header = (props) => {
  return <h1>{props.label}</h1>;
};

const Part = ({ name, exercises, id }) => {
  return (
    <p key={id}>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  let totalExercises = parts.reduce(
    (total, nextPart) => total + nextPart.exercises,
    0
  );
  return (
    <>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
      <b>total of {totalExercises} exercises</b>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header label={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
