import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import AdminManageContent from '../../../client/src/pages/AdminManageContent'; 

test('renders AdminManageContent component', () => {
  const { getByText } = render(<AdminManageContent />);
  const divElement = getByText('Admin ManageContent');
  expect(divElement).toBeInTheDocument();
});
