import React, {useState} from 'react' //Imports react from react
import TourList from "./Components/Gallery" //Imports the Tour Lists from Gallery

function App() {
  const [tours, setTours] = useState([]) //Stores Data within the State
  const removeTour = (id) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id)); //Creates a function to remove tours
  };
  return (
    <main>
      <h1>Offered Tours</h1>
      <TourList tours={tours} setTours={setTours} onRemove={removeTour} />
    </main>
  )
} //Returns the Tour List in the console

export default App; //Exports the app
