import './App.css';
import { Contract, providers, utils } from 'ethers';
import React, { useEffect, useRef, useState } from 'react';
import Web3Modal from 'web3modal';
import { abi, NFT_CONTRACT_ADDRESS } from './constants';

function App() {
  //1. Initialize hooks and variables
  const [walletConnected, setWalletConnected] = useState(false);
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEnded, setPresaleEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  const web3ModallRef = useRef(); //use to access web3 wallet  when loading page


  //2. Declare functions

  // Mint NFT during presale period.
  const presaleMint = async () => {
    try {
      //const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS, // contract address
        abi,  // the contract ABI
        //signer // the signer
      );

      console.log(nftContract);

      const tx = await nftContract.presaleMint({ value: utils.parseEther("0.01") });
      //0.01 = 1000000000000000
      //If from frontend, = use parseEther();
      //If from blockchain, = use parseformater();

      setLoading(true);
      await tx; //wait for the result to avoid errors
      setLoading(false);

      window.alert('You sauccessfully minterd a Crypto Dev!');

    } catch (error) {
      console.error(error);
    }
  }

  //to mint NFT after the presale period
  const publicMint = async () => {
    try {
      // const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS,
        abi
        // signer
      );

      //value == msg.value in SC
      const tx = await nftContract.mint({
        value: utils.parseEther("0.01"),
      });

      setLoading(true);
      await tx; //wait for the result to avoid errors
      setLoading(false);
      window.alert("You have successfully minted a Crypto Dev!");
    } catch (error) {
      console.error(error);
    }
  };

  //EOA && CA
  //EOA - Metamask (private key)
  //CA - (NO private key)

  const connectWallet = async () => {
    try {
      // await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to start Presale
  // During preSale, discounted prices, time is limited, exclusivity
  // These are for those who whitelisted
  const startPresale = async () => {
    try {
      // const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS,
        abi
        // signer
      );

      const tx = await nftContract.startPresale();
      setLoading(true);
      await tx.wait();
      //can add more implementation
      setLoading(false);

      window.alert("Presale has started!");
      // await checkIfPresaleStarted();
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfPresaleStarted = async () => {
    // can be imporoved??
    try {
      // const provider = await getProviderOrSigner();

      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS,
        abi
        // provider
      );

      const _presaleStarted = await nftContract.presaleStarted();

      setLoading(true);
      await _presaleStarted.wait();
      setLoading(false);

      //if it is false get the owner
      if (!_presaleStarted) {
        // await getOwner();
      }
      setPresaleStarted(_presaleStarted);
      return _presaleStarted;
    } catch (error) {
      console.error(error);
    }
  };

  // check if presaleEnded
  const checkIfPresaleEnded = async () => {
    try {
      // const provider = await getProviderOrSigner();

      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS,
        abi
        // provider
      );

      const _preSaleEnded = await nftContract.presaleEnded();

      const hasEnded = Math.floor(Date.now) / 1000 >= presaleEnded;
      //will throw true or false (if else)
      // const hasEnded = _preSaleEnded.lt(Math.floor(Date.now) / 1000);

      if (hasEnded) {
        setPresaleEnded(true);
      } else {
        setPresaleEnded(false);
      }

      return hasEnded;
    } catch (error) {
      console.error(error);
    }
  };

  //function to get Owner of the contract
  const getOwner = async () => {
    try {
      //const provider = await getProviderOrSigner();
      const nftContract = new Contract(
        NFT_CONTRACT_ADDRESS, abi,
        //provider
      )
        const _owner = await nftContract.owner();

        //const signer = await getProviderOrSigner(true);

        if(address === _owner) {
          setIsOwner 
        }

    } catch (err) {
      console.log(err);
    }
  }

  return <div className="App"></div>;
}

export default App;