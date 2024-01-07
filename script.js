const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    if (this.read === 'read') {
        this.read = 'not read';
    }else{
        this.read = 'read';
    }
}

function addBookToLibrary() {
    // listen for submit
    document.getElementById('submit').addEventListener('click', function(e) {
        e.preventDefault();

        // get info from the form
        const title = document.getElementById('book').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('status').value;

        // check if all fields are filled
        if (!title || !author || !pages || !read) {
            alert('Please fill in all fields');
            return;
        }else{
            // instantiate book if all fields are filled
            const book = new Book(title, author, pages, read);
            myLibrary.push(book);
            displayBooks();
            document.getElementById('book').value = '';
            document.getElementById('author').value = '';
            document.getElementById('pages').value = '';
            document.getElementById('status').value = '';
            
        }
    });
}
function displayBooks() {
     // get the table body
     const tableBody = document.getElementById('table-body');

     // clear the table body
     tableBody.innerHTML = '';
 
     myLibrary.forEach(function(book, index) {
         // create a row
         const row = document.createElement('tr');
         row.setAttribute("data-book-id", index);
         row.innerHTML = `
             <td>${book.title}</td>
             <td>${book.author}</td>
             <td>${book.pages}</td>
             <td>
                 ${book.read === 'read' ? '<button class="read-btn">Read</button>' : 
                 '<button class="not-read-btn">Not Read</button>'}
             </td>
             <td>
                 <button class="delete-btn">Delete</button>
             </td>
         `;
         // append the row to the table body
         tableBody.appendChild(row);
     });
    deleteBook();
    toggleRead();

}

function deleteBook() {
    // get all delete buttons
    let buttons = document.querySelectorAll(".delete-btn");

    // add new click event listeners
    buttons.forEach(function(button) {
        button.addEventListener("click", function(e){
            // get the parent tr element
            const row = e.target.parentElement.parentElement;
            // get the data-book-id attribute
            const bookId = row.getAttribute('data-book-id');
            myLibrary.splice(bookId, 1);
            displayBooks();
        });
    });
}

function toggleRead() {
    // get all read buttons
    let buttons = document.querySelectorAll(".read-btn, .not-read-btn");

    // add new click event listeners
    buttons.forEach(function(button) {
        button.addEventListener("click", function(e){
            // get the parent tr element
            const row = e.target.parentElement.parentElement;
            // get the data-book-id attribute
            const bookId = row.getAttribute('data-book-id');
            myLibrary[bookId].toggleReadStatus();
            displayBooks();
        });
    });
}


addBookToLibrary()
