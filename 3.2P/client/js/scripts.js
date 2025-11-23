$(document).ready(function () {

    // Load existing books
    fetch("/api/books")
        .then(res => res.json())
        .then(books => {
            const container = document.getElementById("books-container");

            books.forEach(book => {
                container.innerHTML += `
                <div class="col s12 m6 l4">
                    <div class="card small">
                        <div class="card-image">
                            <img src="${book.image}" class="materialboxed card-image-fixed">
                            <span class="card-title">${book.title}</span>
                        </div>
                        <div class="card-content">
                            <p><strong>Author:</strong> ${book.author}</p>
                            <p>${book.description}</p>
                        </div>
                    </div>
                </div>`;
            });

            $('.materialboxed').materialbox();
        });


    // Add new book form
    const submitForm = () => {
        let newBook = {
            title: $('#book_title').val(),
            author: $('#book_author').val(),
            description: $('#book_desc').val(),
            image: $('#book_image').val()
        };

        console.log("New Book Added:", newBook);

        addSingleBook(newBook);
    };


    const addSingleBook = (book) => {
    const container = document.getElementById("books-container");

    container.innerHTML += `
        <div class="col s12 m6 l4">
            <div class="card small">
                <div class="card-image">
                    <img src="${book.image}" class="materialboxed card-image-fixed">
                    <span class="card-title">${book.title}</span>
                </div>
                <div class="card-content">
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p>${book.description}</p>
                </div>
            </div>
        </div>
    `;

    $('.materialboxed').materialbox();
    };


    // Materialize Initializers
    $('.modal').modal();
    $('.materialboxed').materialbox();

    // Submit Button
    $('#submitBook').click(() => {
        submitForm();
    });

});
