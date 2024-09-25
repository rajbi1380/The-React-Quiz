import { createContext, useReducer, useEffect, useContext } from "react";
const contextQuiz = createContext();
let specialTime = 30;

let initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  time: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "ReciveData":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return {
        ...state,
        status: "active",
        time: state.questions.length * specialTime,
      };
    case "answer":
      let question = state.questions.at(state.index);
      console.log(question);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "newQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finish",
        points: state.points,
        highScore:
          state.points < state.highScore ? state.highScore : state.points,
      };
    case "Restar":
      return {
        ...state,
        points: 0,
        answer: null,

        index: 0,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? "timeOut" : state.status,
      };

    default:
      break;
  }
}

function ContextQuiz({ children }) {
  const [
    { questions, status, index, answer, points, highScore, time },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  useEffect(function () {
    async function FetchData() {
      const res = await fetch(
        "https://json-server-two-gamma.vercel.app/questions"
      );
      const data = await res.json();

      dispatch({ type: "ReciveData", payload: data });
    }
    FetchData();
  }, []);
  return (
    <contextQuiz.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        time,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </contextQuiz.Provider>
  );
}

function useContextQuiz() {
  const context = useContext(contextQuiz);
  if (context === "undefined") throw new Error(" CitiesProvied");
  return context;
}
export { ContextQuiz, useContextQuiz };
