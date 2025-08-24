import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        {/* <About />
        <Projects />
        <Contact /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
