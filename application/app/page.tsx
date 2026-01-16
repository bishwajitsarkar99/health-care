// app/page.tsx
import Hero from "./components/Hero";
import Doctors from "./components/Doctors";
import Testimonials from "./components/Testimonials";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header /> 
      <Hero />
      <Doctors />
      <Testimonials />
      <Footer />
    </>
  );
}
