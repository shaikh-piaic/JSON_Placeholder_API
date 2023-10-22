const usersPage = document.getElementById("users-page");
const postsPage = document.getElementById("posts-page");
const commentsPage = document.getElementById("comments-page");
const userTable = document.getElementById("user-table");
const postTable = document.getElementById("post-table");
const commentTable = document.getElementById("comment-table");
// const previousButton = document.getElementById("previous-button");

let currentPage = "users";

// Fetch and display users
fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
        users.forEach((user) => {
            const row = userTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            cell1.textContent = user.id;
            cell2.textContent = user.name;
            cell3.textContent = user.email;
            cell4.textContent = user.phone;

            row.addEventListener("click", () => {
                fetchUserPosts(user.id);
            });
        });
    });

// Fetch and display posts for a user
function fetchUserPosts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => response.json())
        .then((posts) => {
            postTable.tBodies[0].innerHTML = "";
            posts.forEach((post) => {
                const row = postTable.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                cell1.textContent = post.id;
                cell2.textContent = post.title;
                cell3.textContent = post.body;

                row.addEventListener("click", () => {
                    fetchPostComments(post.id);
                });
            });
        });

    // Switch to the posts page
    currentPage = "posts";
    showPage(currentPage);
}

// Fetch and display comments for a post
function fetchPostComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then((response) => response.json())
        .then((comments) => {
            commentTable.tBodies[0].innerHTML = "";
            comments.forEach((comment) => {
                const row = commentTable.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                cell1.textContent = comment.id;
                cell2.textContent = comment.name;
                cell3.textContent = comment.body;
            });
        });

    // Switch to the comments page
    currentPage = "comments";
    showPage(currentPage);

}

// Show the current page and update the "Previous" button visibility
function showPage(page) {
    usersPage.style.display = page === "users" ? "block" : "none";
    postsPage.style.display = page === "posts" ? "block" : "none";
    commentsPage.style.display = page === "comments" ? "block" : "none";
    // previousButton.style.display = page === "users" ? "none" : "block";
}

// Add a click event listener to the "Previous" button
// previousButton.addEventListener("click", () => {
//     if (currentPage === "posts") {
//         currentPage = "users";
//         showPage(currentPage);
//     } else if (currentPage === "comments") {
//         currentPage = "posts";
//         showPage(currentPage);
//     }
// });

// Initialize the UI
showPage(currentPage);
