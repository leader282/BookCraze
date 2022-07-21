import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = () => {
  let [books, setBooks] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9000/books")
      .then((res) => {
        return res.json();
      })
      .then((books) => {
        setBooks(books);
      })
      .catch((err) => console.error(err));
  });

  const add = (book) => {
    book.quantity++;
    fetch("http://localhost:9000/books/" + book.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
  };

  const sub = (book) => {
    if (book.quantity > 1) {
      book.quantity--;
      fetch("http://localhost:9000/books/" + book.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
    } else {
      fetch("http://localhost:9000/books/" + book.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
    }
  };

  const bookDelete = (book) => {
    fetch("http://localhost:9000/books/" + book.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
  };

  const totalCost = () => {
    let total = 0;
    books && books.forEach((book) => (total += book.price * book.quantity));
    return total;
  };

  return (
    <div className="cart">
      <h1>Cart</h1>
      <div className="content">
        {books &&
          books.map((book, index) => {
            return (
              <div className="card" key={index}>
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
                  <b>Price: Rs. {book.price}</b>
                </div>
                <span className="add" onClick={() => add(book)}>
                  +{" "}
                </span>
                <span>{book.quantity}</span>
                <span className="sub" onClick={() => sub(book)}>
                  {" "}
                  -
                </span>
                <div className="delete">
                  <button
                    className="btn-delete"
                    onClick={() => bookDelete(book)}
                  >
                    Remove from Cart
                  </button>
                </div>
                <br />
                <br />
              </div>
            );
          })}
      </div>
      <div className="total">
        <h2>Total Cost</h2>
        <b>Rs. {totalCost()}</b>
      </div>
    </div>
  );
};

export default Cart;
