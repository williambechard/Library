import Head from "next/head";
import { Header, Section, Footer } from "../components";
import DULogo from "../public/DU-Logo-Mark.svg";
import styled from "@emotion/styled";
import Flex from "../components/Flex";
import Text from "../components/Text/Text";

const FlexPage = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

const Home = () => {
  return (
    <>
      <Head>
        <title>DU Capstone</title>
        <meta
          name="description"
          content="Capstone project for Digital University Dev Team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FlexPage data-testid={"home-1"}>
        <Header title={"William's Capstone"} icon={DULogo} height={"75px"} />
        <Section>
          <Text content={"Hello World!"} bgColor="#dfdfdf" fontSize={1} />
        </Section>
        <Footer
          title={"@ 2022 Omni Federal - All Rights Reserved"}
          bgColor={"black"}
          fColor={"white"}
        />
      </FlexPage>
    </>
  );
};

export default Home;
