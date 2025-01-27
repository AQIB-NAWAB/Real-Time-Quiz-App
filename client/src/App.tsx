import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import UserCard from "./components/UserCard";
import Admin from "./pages/Admin";
import QuizEditor from "./pages/QuizEditor";
import Quizes from "./pages/Quizes";
import QuizJoin from "./pages/QuizJoin";
import QuizPlay from "./pages/QuizPlay";

const App = () => {
  return (
    <>
      <UserCard />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/quiz/editor/:name" element={<QuizEditor />} />
        <Route path="/quizes" element={<Quizes />} />
        <Route path="/quiz/join/:quizName" element={<QuizJoin />} />
        <Route path="/quiz/play/:quizName" element={<QuizPlay />} />
      </Routes>
    </>
  );
};

export default App;
