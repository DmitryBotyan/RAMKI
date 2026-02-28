import { Routes, Route } from 'react-router-dom';
import Variant1App from './variants/Variant1/App';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Variant1App />} />
    </Routes>
  );
}

export default App;
