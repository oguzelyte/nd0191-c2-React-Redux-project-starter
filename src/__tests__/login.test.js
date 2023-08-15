import * as React from 'react';
import { fireEvent, screen, act } from '@testing-library/react';
import Login from '../components/Login';
import { renderWithProviders } from '../utils/utilsForTests';
import { _getUsers, _getQuestions } from '../utils/_DATA';

describe('login', () => {
  const initialUsers = {
    sarahedo: {
      id: 'sarahedo',
      password: 'password123',
      name: 'Sarah Edo',
      avatarURL: '/images/users/sarah.svg',
      answers: {
        '8xf0y6ziyjabvozdd253nd': 'optionOne',
        '6ni6ok3ym7mf1p33lnez': 'optionOne',
        am8ehyc8byjqgar0jgpub9: 'optionTwo',
        loxhs1bqm25b708cmbf3g: 'optionTwo'
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    }
  };

  const renderLogin = () => {
    return renderWithProviders(<Login />, {
      preloadedState: {
        users: initialUsers
      }
    });
  };

  // 5. snapshot test for login
  it('will match login snapshot', async () => {
    const utils = renderLogin();
    await expect(utils).toMatchSnapshot();
  });

  // 6. DOM test for login, to show user dropdown on click
  it('will show the users dropdown on click', async () => {
    renderLogin();
    expect(screen.queryByTestId('user-dropdown')).not.toBeInTheDocument();

    const toggleBtn = await screen.findByTestId('user-btn');
    expect(toggleBtn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(toggleBtn);
    });

    const dropdown = await screen.findByTestId('user-dropdown');
    expect(dropdown).toBeInTheDocument();
  });

  // custom unit test 1
  it('on the login page, the logo is present', () => {
    renderLogin();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  // custom unit test 2
  it('verify login button is disabled if no user selected in dropdown', async () => {
    renderLogin();
    expect(screen.getByTestId('submit-btn')).toHaveAttribute('disabled');

    const toggleBtn = screen.getByTestId('user-btn');
    await fireEvent.click(toggleBtn);

    // after selecting user the button is enabled
    const selectedUser = await screen.findByTestId('sarahedo');
    await fireEvent.click(selectedUser);

    expect(screen.getByTestId('submit-btn')).not.toHaveAttribute('disabled');
  });
});
