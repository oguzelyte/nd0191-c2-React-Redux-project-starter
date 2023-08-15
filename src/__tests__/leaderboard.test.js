import * as React from 'react';
import { fireEvent, screen, act, getAllByTestId } from '@testing-library/react';
import Leaderboard from '../components/Leaderboard';
import { renderWithProviders } from '../utils/utilsForTests';
import { getInitialData } from '../utils/api';
import { sortUsersByActivity } from '../utils/helpers';

describe('leaderboard', () => {
  let users, questions;

  // Fetch data before each test
  beforeEach(async () => {
    const data = await getInitialData();
    users = data.users;
    questions = data.questions;
  });

  const renderLeaderboard = () => {
    return renderWithProviders(<Leaderboard />, {
      preloadedState: {
        users,
        questions
      }
    });
  };

  // custom unit test 3
  it('on the leaderboard page, verify all users are present', async () => {
    await renderLeaderboard();
    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
    expect(screen.getByText('Mike Tsamis')).toBeInTheDocument();
    expect(screen.getByText('Tyler McGinnis')).toBeInTheDocument();
    expect(screen.getByText('Zenobia Oshikanlu')).toBeInTheDocument();
  });

  // custom unit test 4
  it('the highest points user is at the top of the list', async () => {
    await renderLeaderboard();
    const sortedUsers = sortUsersByActivity(users);
    const firstUser = screen.getByTestId('user-0');
    expect(firstUser?.textContent).toEqual(Object.values(sortedUsers)[0].id);
  });
});
