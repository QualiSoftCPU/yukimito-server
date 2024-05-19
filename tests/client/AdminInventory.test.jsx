import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import AdminInventory from '../../../client/src/pages/AdminInventory';

test('renders AdminInventory component', () => {
  const { getByText } = render(<AdminInventory />);
  const divElement = getByText('Admin Inventory');
  expect(divElement).toBeInTheDocument();
});
