import { connect } from 'react-redux';
import { useState, Fragment } from 'react';
import { setAuthedUser } from '../actions/authedUser';
import { useLocation, useNavigate } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Logo from './Logo';

const Login = (props) => {
  const { users, dispatch } = props;
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setAuthedUser(selected.id));

    const from = location.state?.from || '/';

    navigate(from);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {users.length > 0 && (
        <div>
          <div data-testid="logo" className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Logo />
            <h1 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login as:</h1>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <div className="relative mt-2">
                      <Listbox.Button
                        data-testid="user-btn"
                        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      >
                        <span className="flex items-center">
                          {selected && <img src={selected.avatarURL} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />}
                          {selected ? (
                            <span className="ml-3 block truncate">{selected.name}</span>
                          ) : (
                            <span className="block truncate">Select user</span>
                          )}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          data-testid="user-dropdown"
                          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                          {users.map((person) => (
                            <Listbox.Option
                              key={person.id}
                              data-testid={person.id}
                              className={({ active }) =>
                                classNames(
                                  active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9'
                                )
                              }
                              value={person}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <img src={person.avatarURL} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                      {person.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>

              <button
                className="disabled:opacity-30 disabled:pointer-events-none flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onSubmit={handleSubmit}
                type="submit"
                disabled={!selected}
                data-testid="submit-btn"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.keys(users).map((key) => users[key])
});
export default connect(mapStateToProps)(Login);
