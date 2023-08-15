import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { useNavigate } from 'react-router-dom';

const NewPoll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstOption || !secondOption) {
      alert('Both options have to be specified.');
      return;
    }

    dispatch(handleAddQuestion({ optionOneText: firstOption, optionTwoText: secondOption })).then((question) => {
      setFirstOption('');
      setSecondOption('');
      navigate('/');
    });
  };

  const [firstOption, setFirstOption] = useState('');
  const [secondOption, setSecondOption] = useState('');

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="pt-4 text-center pb-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">Would you rather?</h1>
      <h2 className="pb-4 text-center text-gray-500 dark:text-gray-400">Create your own poll</h2>
      <form className="new-poll max-w-4xl m-auto" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="first-option" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Option One
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            data-testid="first-option"
            id="first-option"
            type="text"
            placeholder="Option One"
            onChange={(e) => setFirstOption(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="second-option" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Option Two
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            data-testid="second-option"
            id="second-option"
            type="text"
            placeholder="Option Two"
            onChange={(e) => setSecondOption(e.target.value)}
          />
        </div>

        <button
          className="text-white w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-30 disabled:pointer-events-none
          focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          data-testid="submit-btn"
          type="submit"
          onSubmit={handleSubmit}
          disabled={secondOption === '' || firstOption === ''}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPoll;
