import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminDashBoard from '../../../client/src/pages/AdminDashboard';

describe('AdminDashboard Component', () => {
  test('renders component correctly', () => {
    render(<AdminDashBoard />);
   
    const title = screen.getByRole('heading', { name: /YUKIMITO/i });
    expect(title).toBeInTheDocument();

    expect(screen.getByText('LOG OUT')).toBeInTheDocument();

    expect(screen.getByAltText('cartoon dog')).toBeInTheDocument();
  });

  test('logout button click triggers logout function', () => {
    render(<AdminDashBoard />);

    const localStorageClearMock = jest.spyOn(global.localStorage, 'clear');
    localStorageClearMock.mockImplementation(() => {});

    fireEvent.click(screen.getByText('LOG OUT'));

    expect(localStorageClearMock).toHaveBeenCalled();
  });
});
