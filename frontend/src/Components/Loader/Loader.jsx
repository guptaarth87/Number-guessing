import React, { useState, useEffect } from 'react';
import './Loader.css'; // Make sure to import your CSS file

const Loader = () => {
  
//   useEffect(() => {
//     // Simulate data loading
//     setTimeout(() => {
//       setIsLoading(false); // Set loading to false after a certain delay
//     }, 3000);
//   }, []);

  return (
    <div className="containerx">
     
        <div className="loader-container">
          <div className="loader"></div>
          <p>Fetching Menu</p>
        </div>
      
    </div>
  );
};

export default Loader;
