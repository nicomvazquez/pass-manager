import React, { useState } from "react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

  const generatePassword = () => {
    let characters = "";

    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSpecialChars) characters += "!@#$%^&*()_+";

    let newPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters.charAt(randomIndex);
    }

    setPassword(newPassword);
  };

  return (
    <div>
      <div className="bg-gray-700 max-w-md p-5 rounded-md">
        <h1 className="">Password Generator</h1>
        <label htmlFor="length">Password Length:</label>
        <input
          className="mx-3 rounded-md bg-gray-900"
          type="number"
          id="length"
          min="4"
          max="50"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <br />
        <label>
          <input
            className="mx-3"
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          Include Uppercase
        </label>
        <br />
        <label>
          <input
            className="mx-3"
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          Include Lowercase
        </label>
        <br />
        <label>
          <input
            className="mx-3"
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>
        <br />
        <label>
          <input
            className="mx-3"
            type="checkbox"
            checked={includeSpecialChars}
            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
          />
          Include Special Characters
        </label>
        <br />
        <button onClick={generatePassword}>Generate Password</button>
        <br />
        <h3>Password: {password}</h3>
      </div>
    </div>
  );
};

export default PasswordGenerator;
