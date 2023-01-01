import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { Navbar } from '../../../components';
import { render, screen, waitFor } from '@testing-library/react';
import { debug } from 'jest-preview';
import userEvent from '@testing-library/user-event';
import useHelperFunctions from '../../../hooks/useHelperFunctions';

beforeEach(() => {
  delete global.window.location;
  global.window = Object.create(window);
  global.window.location = {};
});

describe('Navbar component tests', () => {
  it('should display the default navbar where we are on the home (books) page', () => {
    const url = 'http://localhost:3000/';
    Object.defineProperty(window, 'location', {
      value: new URL(url)
    });
    render(<Navbar />);
    debug();
    const textElement = screen.getByText(/Books/i);
    const textElement2 = screen.getByText(/Authors/i);
    expect(textElement2).toHaveStyle(
      'margin:auto 5px auto 5px',
      'display:inline-block',
      'font-size:1',
      'color:black',
      'font-weight:400'
    );
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle(
      'margin:auto 5px auto 5px',
      'display:inline-block',
      'font-size:1',
      'color:blue',
      'font-weight:bolder'
    );
  });

  it('should display the default navbar where we are on the authors page', () => {
    const url = 'http://localhost:3000/authors';
    Object.defineProperty(window, 'location', {
      value: new URL(url)
    });
    render(<Navbar />);
    debug();
    const textElement = screen.getByText(/Authors/i);
    const textElement2 = screen.getByText(/Books/i);
    expect(textElement2).toHaveStyle(
      'margin:auto 5px auto 5px',
      'display:inline-block',
      'font-size:1',
      'color:black',
      'font-weight:400'
    );
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle(
      'margin:auto 5px auto 5px',
      'display:inline-block',
      'font-size:1',
      'color:blue',
      'font-weight:bolder'
    );
  });

  it('should change to Author page from the Books page', async () => {
    const url = 'http://localhost:3000/';
    Object.defineProperty(window, 'location', {
      value: new URL(url)
    });

    render(<Navbar />);
    debug();
    const authorsLink = screen.getByText(/Authors/i);
    const booksLink = screen.getByText(/Books/i);
    waitFor(() => {
      userEvent.click(authorsLink);
      expect(authorsLink).toHaveStyle(
        'margin:auto 5px auto 5px',
        'display:inline-block',
        'font-size:1',
        'color:blue',
        'font-weight:bolder'
      );
      expect(booksLink).toHaveStyle(
        'margin:auto 5px auto 5px',
        'display:inline-block',
        'font-size:1',
        'color:black',
        'font-weight:400'
      );
    });
  });

  it('should chnage to Books page from the Authors page', async () => {
    const url = 'http://localhost:3000/authors';
    Object.defineProperty(window, 'location', {
      value: new URL(url)
    });

    render(<Navbar />);
    debug();
    const authorsLink = screen.getByText(/Authors/i);
    const booksLink = screen.getByText(/Books/i);

    waitFor(() => {
      userEvent.click(booksLink);
      expect(booksLink).toHaveStyle(
        'margin:auto 5px auto 5px',
        'display:inline-block',
        'font-size:1',
        'color:blue',
        'font-weight:bolder'
      );
      expect(authorsLink).toHaveStyle(
        'margin:auto 5px auto 5px',
        'display:inline-block',
        'font-size:1',
        'color:black',
        'font-weight:400'
      );
    });
  });

  it('should change to Categories page from the Authors page', async () => {
    const url = 'http://localhost:3000/authors';
    Object.defineProperty(window, 'location', {
      value: new URL(url)
    });

    render(<Navbar />);
    debug();
    const authorsLink = screen.getByText(/Authors/i);

    const categoriesLink = screen.getByText(/Categories/i);
    waitFor(() => {
      userEvent.click(categoriesLink);
      expect(categoriesLink).toHaveStyle(
        'margin:auto 5px auto 5px',
        'display:inline-block',
        'font-size:1',
        'color:blue',
        'font-weight:bolder'
      );
      expect(authorsLink).toHaveStyle(
        'margin:auto 5px auto 5px',
        'display:inline-block',
        'font-size:1',
        'color:black',
        'font-weight:400'
      );
    });
  });
});
