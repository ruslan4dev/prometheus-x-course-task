import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import { SpecificBook } from "components/specific-book";
import { BooksProvider } from 'hooks/use-books';
import { CartProvider } from 'hooks/use-cart';
import { UserProvider } from 'hooks/use-user';
import '@testing-library/jest-dom';

const mockSetState = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    bookID: 1
  })
}));

describe('Check input of books amount', () => {
  const setup = () => {
    const utils = render(
      <UserProvider value={{ username: 'Ruslan', mockSetState }}>
        <BooksProvider value={[{id: '1', price: '15'}]}>
          <CartProvider value={{books: [], mockSetState}}>
            <SpecificBook />
          </CartProvider>
        </BooksProvider>
      </UserProvider>
    )
    const input = screen.getByRole('spinbutton')
    const span = screen.getByTestId('total-price')
    return {
      input,
      span,
      ...utils,
    }
  }

  test('Input of books count should have the value 2 after step up', () => {
    const {input} = setup()
    fireEvent.click(screen.getByTestId('button-step-up'))
    expect(input.value).toBe("2")
  })

  test('Input of books count should have the value 1 after step down', () => {
    const {input} = setup()
    fireEvent.click(screen.getByTestId('button-step-down'))
    expect(input.value).toBe("1")
  })

  test('Total price should be changed', () => {
    const { input, span } = setup()
    fireEvent.change(input, {target: {value: 2}})
    expect(input.value).toBe("2")
    expect(span.textContent).toBe("30.00")
  })
})