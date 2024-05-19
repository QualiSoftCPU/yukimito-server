import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import AdminBooking from '../../../client/src/pages/AdminBooking'; 

test('renders AdminBooking component', () => {
  const { getByText } = render(<AdminBooking />);
  const divElement = getByText('Admin Booking');
  expect(divElement).toBeInTheDocument();
});