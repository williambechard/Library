import React from 'react';
import Head from 'next/head';
import { Section, Flex, Text, Navbar } from '../';
import DULogo from '../../public/DU-Logo-Mark.svg';
import Image from 'next/image';
import colors from '../../theme/colors';

const Layout = ({ children }) => {
  return (
    <>
      {' '}
      <Head>
        <title>DU Capstone</title>
        <meta
          name="description"
          content="Capstone project for Digital University Dev Team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section bgColor={colors.mono[1]} height={'100%'}>
        <Flex
          position={'fixed'}
          top={'0'}
          left={'0'}
          zIndex={'2'}
          justifyContent={'flex-start'}
          alignContent={'flex-start'}
          gap={'15px'}
          height={'70px'}
          wrap={'wrap'}
        >
          <div style={{ margin: '10px', display: 'inline-block' }}>
            <Image src={DULogo} alt={'DULogo'} width={'50px'} height={'50px'} />
          </div>
          <Text
            fontSize={'1.70'}
            fontWeight={'1000'}
            margin={'auto 10px'}
            height={'100%'}
          >
            <span>William's Capstone</span>
          </Text>
          <Navbar />
        </Flex>
      </Section>
      {children}
    </>
  );
};

export default Layout;
