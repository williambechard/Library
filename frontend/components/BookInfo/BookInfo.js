import React from "react";
import { useGetBook } from "../../api/books";

const BookInfo = ({ id }) => {
  const { book } = useGetBook(id);

  return <>book</>;
};

export default BookInfo;
