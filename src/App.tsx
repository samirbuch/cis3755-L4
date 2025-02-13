import { csv } from "d3"; // import the CSV reader from D3 
import { useEffect, useState } from "react"; // import the useEffect React Lifecycle Hook
import "./App.css";
// import ScatterPlot from "./Components/ScatterPlot"; //import your custom component
// import OneDData from "./Components/1D-Data";
// import TwoDData from "./Components/2D-Data";
import Activity2 from "./Components/Activity2";

function App() {

  //register your state variables with React 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //loading your data asynchronously 
  useEffect(() => {
    csv("./data/cars.csv").then((d) => {
      setData(d); //set data with the imported data from the CSV file 
      setLoading(false);
    });
    return () => undefined;
  }, []);

  if(loading) {
    return (
      <h1>Loading...</h1>
    );
  }

  //render your custom Component (you could render full pages here that have multiple components)
  return (
      // <ScatterPlot data={data} width={750} height={750} /> 
      <Activity2 height={100} width={1000} data={data} />
  );
}

export default App; 
