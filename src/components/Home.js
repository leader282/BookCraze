import { useEffect, useState } from "react";

const Home = () => {
  let [query, setQuery] = useState("new");
  let [books, setBooks] = useState(null);

  useEffect(() => {
    if (query === "") query = "new";
    fetch("https://api.itbook.store/1.0/search/" + query)
      .then((res) => {
        return res.json();
      })
      .then((books) => {
        setBooks(books.books);
      })
      .catch((err) => console.error(err));
  }, [query]);

  return (
    <div className="home">
      <div
        className="searchbar"
        onChange={(event) => setQuery(event.target.value)}
      >
        <input placeholder="Search Language Here" />
      </div>
      <div className="content">
        {books &&
          books.map((book, index) => {
            return (
              <div className="card">
                <img
                  src={book.image}
                  alt="book_img"
                  style={{ width: "10%" }}
                />
                <div className="container">
                  <h4>
                    <b>{book.title}</b>
                  </h4>
                  <p>Price: {book.price}</p>
                </div>
                <br />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
