import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import AdminVaccine from '../../../client/src/pages/AdminVaccine';

test('renders AdminVaccine component', () => {
  const { getByText } = render(<AdminVaccine />);
  const divElement = getByText('Admin Vaccine');
  expect(divElement).toBeInTheDocument();
});
