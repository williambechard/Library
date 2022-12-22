import React, { useState, useEffect } from 'react';
import { Text, Flex, colors } from '../';
import Link from 'next/link';

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState('/');

  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []);

  return (
    <>
      <Link href="/">
        <Text
          clickable={true}
          margin={'25px 5px 25px 5px'}
          onClick={() => setCurrentPage('/')}
          display={'inline-block'}
          fontSize={'1'}
          fColor={currentPage === '/' ? 'blue' : 'black'}
          fontWeight={currentPage === '/' ? 'bolder' : '400'}
        >
          Books
        </Text>
      </Link>
      <Link href="/authors">
        <Text
          clickable={true}
          margin={'25px 5px 25px 5px'}
          onClick={() => setCurrentPage('/authors')}
          display={'inline-block'}
          fontSize={'1'}
          fColor={currentPage === '/authors' ? 'blue' : 'black'}
          fontWeight={currentPage === '/authors' ? 'bolder' : '400'}
        >
          Authors
        </Text>
      </Link>
    </>
  );
};

export default Navbar;