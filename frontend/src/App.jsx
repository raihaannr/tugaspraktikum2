import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerificationButton from './components/VerificationButton';
import VerifyEmail from './components/VerifyEmail';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Register />} />
        <Route path="/Verification" element={<VerificationButton />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
