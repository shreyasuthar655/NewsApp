import "./App.css";

import React, { useState, setState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

// export default class App extends Component {
const App = () => {

  const [progress, setProgress] = useState(0)
  
    return (
      <div>          
          
        <BrowserRouter>
        <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
        // onLoaderFinished={() => setProgress(0)}
      />
          <Navbar />
            <Routes>
              <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={12} country="in" category="general" />}></Route>
              <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={12} country="in" category="business" />}></Route>
              <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={12} country="in" category="entertainment" />}></Route>
              <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={12} country="in" category="health" />}></Route>
              <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={12} country="in" category="science" />}></Route>
              <Route exact path="/sports" key="sports" element={<News setProgress={setProgress} key="sports" pageSize={12} country="in" category="sports" />}></Route>
              <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={12} country="in" category="technology" />}></Route>
          
            </Routes>
        </BrowserRouter>
      </div>
    );
}
export default App;