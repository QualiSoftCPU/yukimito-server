import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; 

import AdminLogin from '../../../client/src/pages/AdminLogin';

jest.mock('axios');

describe('AdminLogin Component', () => {
  test('renders without crashing', () => {
    render(<AdminLogin />);
  });

  test('input fields update correctly', () => {
    const { getByPlaceholderText } = render(<AdminLogin />);
    const usernameInput = getByPlaceholderText('Admin Username');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });

  test('submits the form with correct data', async () => {
    const { getByPlaceholderText, getByText } = render(<AdminLogin />);
    const usernameInput = getByPlaceholderText('Admin Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    axios.post.mockResolvedValueOnce({ data: { token: 'testtoken' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:4269/api/auth/signin/admin',
        { username: 'testuser', password: 'testpassword' }
      );
    });
  });
});
