function TimeOut({ points, maxPoints, dispatch }) {
  let precentage = Math.ceil((points / maxPoints) * 100);
  return (
    <>
      {" "}
      <p class="timeOut">
        <span>🥴</span> Your time is finish!{" "}
      </p>
      <p className="highscore">
        your point untill now <strong>{points}</strong> out of {maxPoints} your
        precentage {precentage}%
      </p>{" "}
      <strong className="emojy" onClick={() => dispatch({ type: "Restar" })}>
        😣
      </strong>
    </>
  );
}

export default TimeOut;
