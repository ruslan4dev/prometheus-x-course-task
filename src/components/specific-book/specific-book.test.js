import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import { SpecificBook } from "components/specific-book";
import '@testing-library/jest-dom';

describe('Check input of books amount', () => {
  const setup = () => {
    const utils = render(<SpecificBook />)
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
    fireEvent.change(input, {target: {value: 2}})
    expect(input.value).toBe("2")
  })

  test('Input of books count should have the value 1 after step down', () => {
    const {input} = setup()
    input.value = "2"
    fireEvent.change(input, {target: {value: 1}})
    expect(input.value).toBe("1")
  })

  test('Total price should be changed', () => {
    const { input, span } = setup()
    span.textContent = "0"
    fireEvent.change(input, {target: {value: 2}})
    expect(input.value).toBe("2")
    expect(span.textContent).not.toBe("0")
  })
})