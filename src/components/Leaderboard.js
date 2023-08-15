import { connect } from 'react-redux';
import { sortUsersByActivity } from '../utils/helpers';

const Leaderboard = (props) => {
  const { users } = props;

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="pt-4 pb-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">Leaderboard</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table data-testid="leaderboard" className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Answered
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={user.avatarURL} alt="user" />
                    <div className="pl-3">
                      <div className="text-base font-semibold">{user.name}</div>
                      <div className="font-normal text-gray-500" data-testid={'user-' + index}>
                        {user.id}
                      </div>
                    </div>
                  </th>
                  <td data-testid={user.id + '-answers'} className="px-6 py-4">
                    {Object.values(user.answers).length}
                  </td>
                  <td className="px-6 py-4" data-testid={user.id + '-created'}>
                    {user.questions.length ?? 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: sortUsersByActivity(users)
});

export default connect(mapStateToProps)(Leaderboard);
