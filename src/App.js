
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tour from './Tutoriel'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Tour />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
