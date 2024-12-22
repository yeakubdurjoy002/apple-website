import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <main className="bg-black">
      <Navbar></Navbar>
      <Hero></Hero>
      <Highlights></Highlights>
    </main>
  );
}
