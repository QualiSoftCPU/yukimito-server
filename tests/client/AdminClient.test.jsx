import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import AdminClient from '../../../client/src/pages/AdminClient'; 

test('renders AdminClient component', () => {
  const { getByText } = render(<AdminClient />);
  const divElement = getByText('Admin Client');
  expect(divElement).toBeInTheDocument();
});