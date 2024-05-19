import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import AdminCalendar from '../../../client/src/pages/AdminCalendar'; 

test('renders AdminCalendar component', () => {
  const { getByText } = render(<AdminCalendar />);
  const divElement = getByText('Admin Calendar');
  expect(divElement).toBeInTheDocument();
});