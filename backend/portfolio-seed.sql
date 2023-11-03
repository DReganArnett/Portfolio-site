-- all test users have the password, "password"

INSERT INTO users (username, password, first_name, last_name, email, administrator)
VALUES ('testUser1', 'password', 'Adam', 'Smith', 'adam@email.com', 'false');
       ('testUser2', 'password', 'Brenda', 'Baker', 'brenda@email.com', 'false');

INSERT INTO blog_posts (title, content, username)
VALUES ('My First Blog Post', 'This is my very first blog post!', 'testUser2');

INSERT INTO comments (comment_text, username, post_id)
VALUES ('This post is a bit boring.', 'testUser2', 2);

INSERT INTO projects (title, description, url)
VALUES ('My Kids` Lunchbox', 'My Kids` Lunchbox is a dynamic web application created to help families manage what foods they put into children`s lunchboxes.', 'https://my-kids-lunchbox.onrender.com');