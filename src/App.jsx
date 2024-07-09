

/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberallow, setNumberAllow] = useState(false);
  const [charallow, setCharAllow] = useState(false);
  const [password, setPassword] = useState('');
  const generatepassword = useCallback(()=> {
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallow) str+='0123456789'
    if(charallow) str+= "!@#$%^&*()_+"
    for(let i=1; i<=length; i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass+=str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberallow, charallow])

  useEffect(() => {
    generatepassword()
  }, [length, numberallow, charallow])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordref.current?.select()
  }

  const passwordref = useRef(null)

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-600 text-black">
        <h1 className="text-white text-center my-3">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordref}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-black px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 '>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length" className="text-white">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="number"
              defaultChecked={numberallow}
              onChange={() => setNumberAllow((prev) => !prev)}
            />
            <label htmlFor="number" className="text-white">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2" >
            <input
              type="checkbox"
              id="charInput"
              defaultChecked={charallow}
              onChange={() => setCharAllow((prev) => !prev)}
            />
            <label htmlFor="charInput" className="text-white">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

