  import 'swiper/css';
  import 'swiper/css/navigation';

import { Routes, Route, Link } from "react-router-dom";
import BookingWizard from "./components/BookingWizard";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Home from "./components/Home";


 export default function TutoringLandingPage() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<BookingWizard />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}
