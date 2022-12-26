import '../styles/global.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BooksProvider, ToastProvider } from '../providers';

import { createContext } from 'react';
import { useGetBooks } from '../api/books';
import { Layout } from '../components';
import ViewBookProvider from '../providers/ViewBookProvider';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  cache: new InMemoryCache()
});

const App = ({ Component, pageProps }) => {
  //const { books } = useGetBooks();

  //const BooksContext = createContext(books);

  return (
    <>
      <ApolloProvider client={client}>
        <ToastProvider>
          <Layout>
            <BooksProvider>
              <ViewBookProvider>
                <Component {...pageProps} />
              </ViewBookProvider>
            </BooksProvider>
          </Layout>
        </ToastProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
