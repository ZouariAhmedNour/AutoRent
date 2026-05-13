import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />

      <div className="container">
        <h1>Bienvenue dans AutoRent</h1>

        <p>
          Application MERN de location de voitures.
        </p>
      </div>
    </div>
  );
}

export default Home;