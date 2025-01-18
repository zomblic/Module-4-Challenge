const form = document.querySelector("form");

const formSubmitHandler = function (event) {
    event.preventDefault();
    let title = document.querySelector("#title").value;
    let content = document.querySelector("#content").value;
    let username = document.querySelector("#username").value;

    // Validate the form data
    if (!title || !content || !username) {
        const errorElement = document.getElementById("error");
        errorElement.textContent = "Please complete the form.";
        console.log("Form validation failed. Missing data.");
        return;
    }

    let blogPost = {
        title: title,
        content: content,
        username: username,
    };

    console.log("Blog Post: ", blogPost);

    // Store the blog post in local storage
    const blogs = readLocalStorage();
    blogs.push(blogPost);
    localStorage.setItem('blogPost', JSON.stringify(blogs));
    console.log("Blog post saved to local storage:", blogs);

    // Redirect to the blog page
    redirectPage('blog.html');
};

form.addEventListener("submit", formSubmitHandler);