import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

const AddBooks = () => {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");

  const fetchBooks = () => {
    return axios.get("http://localhost:4000/books");
  };

  const addBook = (payload) => {
    return axios.post("http://localhost:4000/books", payload);
  };

  const { data, isLoading, refetch } = useQuery("movies-data", fetchBooks, {
    enabled: false,
  });

  const { mutate } = useMutation(addBook);

  const handleOnSubmit = () => {
    const payload = {
      name: bookName,
      author: authorName,
    };
    mutate(payload, {
      onSuccess: () => {
        refetch();
      },
    });
    setAuthorName("");
    setBookName("");
  };

  return (
    <div>
      <h2>Add Books</h2>
      <div>
        <div className="mb">Book Name</div>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <div className="mt mb">Book Author</div>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
      </div>
      <div className="mt">
        <button onClick={handleOnSubmit}>Add Book</button>
      </div>
      <div className="mt">
        <button onClick={refetch}>Fetch List Of Books</button>
      </div>
      <div className="mt">
        {isLoading ? (
          <div>
            <h2>Loading Books...</h2>
          </div>
        ) : (
          <div>
            <h2>List of Books</h2>
            {data?.data.map((item) => (
              <div key={item.id}>
                <span className="fw-bold mr">{item.id}.</span>
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBooks;
