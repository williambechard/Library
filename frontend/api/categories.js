import { gql, useQuery, useMutation } from '@apollo/client';

//exportable queries
export const getCategory = gql`
  query getCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      books {
        id
        title
      }
    }
  }
`;

//exportable queries
export const getCategories = gql`
  query GetCategories {
    getCategories {
      id
      name
      books {
        id
        title
      }
    }
  }
`;

export const addCategoryMutation = gql`
  mutation addCategory($name: String!) {
    addCategory(name: $name) {
      id
      name
    }
  }
`;

export const useGetCategory = id => {
  const { loading, error, data } = useQuery(getCategory, {
    variables: { id }
  });
  return {
    categoryLoading: loading,
    categoryError: error,
    category: data?.getCategory || {}
  };
};

export const useGetCategories = () => {
  const { loading, error, data } = useQuery(getCategories);
  return {
    categoriesLoading: loading,
    categoriesError: error,
    categories: data?.getCategories || []
  };
};

export const useAddCategory = name => {
  const [add, { loading, error, data }] = useMutation(addCategoryMutation, {
    variables: { name },
    refetchQueries: [{ query: getCategories }]
  });

  return {
    addCategory: name => add({ variables: { name } }),
    addCategoryLoading: loading,
    addCategoryError: error,
    addCategoryData: data
  };
};
