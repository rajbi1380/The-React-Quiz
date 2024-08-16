function Finishscreen({ points, maxPoints, highScore, dispatch }) {
  let precentage = Math.ceil((points / maxPoints) * 100);
  return (
    <>
      {" "}
      <p class="result">
        <span>😊</span> Your Scord <strong>{points}</strong>out of {maxPoints}{" "}
        {precentage}%
      </p>
      <p className="highscore">(HighScore:{highScore} point)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Restar" })}
      >
        Restar Quiz
      </button>
    </>
  );
}

export default Finishscreen;
