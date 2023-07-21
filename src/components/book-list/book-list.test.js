import React from 'react';
import { render } from '@testing-library/react';
import { BookList } from "components/book-list";
import '@testing-library/jest-dom';

test('Render books list', () => {
  render(<BookList />)
})