import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <AnimatedRoutes user={user} />
    </Router>
  );
};

export default App;
