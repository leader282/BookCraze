import { useEffect, useState } from "react";

const Genre = () => {
  let [query, setQuery] = useState("");
  let [books, setBooks] = useState(null);

  const openmodal = (index) => {
    let modal = document.getElementById("modal-no" + index);
    modal.style.display = "block";
  };

  const closemodal = (index) => {
    let modal = document.getElementById("modal-no" + index);
    modal.style.display = "none";
  };

  const addtocart = (index) => {
    books[index].quantity = 1;
    fetch("http://localhost:9000/books", {
        method: "POST",
        headers: { 'Content-Type': "application/json"},
        body: JSON.stringify(books[index])
    }).then(() => {
        let msg = document.getElementById('msg-'+index);
        msg.style.display = "block";
        setTimeout(() => {
            msg.style.display = "none";
        }, 2000);
    })
  }

  useEffect(() => {
    fetch("http://localhost:8000/books")
      .then((res) => {
        return res.json();
      })
      .then((books) => {
        setBooks(books);
      })
      .catch((err) => console.error(err));
  }, [query]);

  return (
    <div className="genre">
      <div
        className="searchbar"
        onChange={(event) => setQuery(event.target.value)}
      >
        <input placeholder="Search genre Here" />
      </div>
      {books &&
        books
          .filter((book) => {
            if (query === "") {
              //if query is empty
              return book;
            } else {
              let isTrue = false;
              book.categories.forEach((category) => {
                if (category.toLowerCase().includes(query.toLowerCase())) {
                  isTrue = true;
                }
              });
              if (isTrue) return book;
            }
          })
          .map((book, index) => {
            return (
              <div key={index}>
                <div
                  className="card"
                  onClick={() => {
                      openmodal(index)
                    }}
                  id="each-genre"
                >
                  <img
                    src={book.thumbnailUrl}
                    alt="book_img"
                    style={{ width: "30%" }}
                  />
                  <div className="container">
                    <h4>
                      <b>{book.title}</b>
                    </h4>
                    <p>Genre: {book.categories.join(" , ")}</p>
                  </div>
                  <br />
                </div>
                <div id={"modal-no" + index} className="modal">
                  <div className="modal-content">
                    <span onClick={() => closemodal(index)} className="close">
                      &times;
                    </span>
                    <div className="in-modal">
                      <img
                        src={book.thumbnailUrl}
                        alt="book_img"
                        style={{ width: "10%" }}
                      />
                      <h3>{book.title}</h3>
                      <h5>{book.shortDescription}</h5>
                      <p>Authors: {book.authors.join(" , ")}</p>
                      <p>Pages: {book.pageCount}</p>
                      <p>Price: Rs. {book.price}</p>
                      <button onClick = {() => addtocart(index)}>Add to cart</button>
                      <p className="msg" id={"msg-"+index}>Done!!</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default Genre;
