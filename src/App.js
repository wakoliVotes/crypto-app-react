import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';

function App() {
  // setting initial states with 'useState'
  const [search, setSearch ] = useState("");
  const [crypto, setCrypto ] = useState([]);

  // using useEffect for setting up operation to 
  // fetching crypto data from the API once component is mounted
  useEffect(() => {
    Axios.get(
      'https://api.coinstats.app/public/v1/coins?skip=0&limit=1000&currency=EUR'
    ).then((res) => {
      setCrypto(res.data.coins);
    });
  }, []);

  // return with visible items on frontend

  return (
    <div className="App">
    <h1>BlockChainKites</h1>
    <h2>Crypto Home</h2>
    <h4>Get an Overview of your favorite Cryptocurrencies on the Go</h4>
    <p>Search and learn more about the Crypto's symbol, market cap, current price and available supply</p>
    <input
        type="text"
        placeholder='Search Crypto'
        onChange={(e) => {
          setSearch(e.target.value);
        }}
     />
     {/* Table for All Cryptocurrencies */}
     <table>
        <thead>
            <tr>
              <td>Rank</td>
              <td>Name</td>
              <td>Symbol</td>
              <td>Market Cap</td>
              <td>Price</td>
              <td>Available Supply</td>
              <td>Volume (24hrs)</td>
            </tr>
        </thead>
        {/* 
         Mapping all the cryptocurrencies
         */}
         <tbody>
          {/* 
          Filtering to check for the specific crypto searched
           */}        
           {crypto
           .filter((val) => {
            return val.name.toLowerCase().includes(search.toLowerCase());
           })
           .map((val, id) => {
            return (
              <>
                <tr id='{id}'>
                <td className='rank'>{val.rank}</td>
                <td className='logo'>
                  <a href={val.websiteUrl}>
                    <img src={val.icon}  alt='logo' width="30px" />
                  </a>
                  {/* Crypto Name */}
                  <p>{val.name}</p>
                </td>
                <td className='symbol'>{val.symbol}</td>
                <td>${val.price.toFixed(2)}</td>
                <td>${val.availableSupply}</td>
                <td>{val.volume}</td>
                </tr>
              </>
            );
           })
           }
        </tbody>
     </table>
    </div>
  );
}

export default App;
