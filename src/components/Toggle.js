import React, { useState } from 'react';

const Switcher11 = ({ toggleQuestionsBlock }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    toggleQuestionsBlock(isChecked);
  };

  return (
    <>
      <label className="mt-4 border themeSwitcherTwo shadow-md relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1">
        <input type="checkbox" className="sr-only" checked={isChecked} onChange={handleCheckboxChange} />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            !isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
          }`}
        >
          Unanswered questions
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
          }`}
        >
          Answered questions
        </span>
      </label>
    </>
  );
};

export default Switcher11;
