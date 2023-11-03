CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    url VARCHAR(255)
);

CREATE TABLE blog_posts(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image VARCHAR, 
    content TEXT,
    date DATE,
    username VARCHAR(25) UNIQUE NOT NULL PRIMARY KEY,
        REFERENCES users ON DELETE CASCADE
);

CREATE TABLE users(
    username VARCHAR(25) UNIQUE NOT NULL PRIMARY KEY,
    id SERIAL,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL CHECK (position ('@' IN email) > 1),
    administrator BOOLEAN NOT NULL
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    comment_text TEXT,
    username VARCHAR(25)
        REFERENCES users ON DELETE CASCADE,
    post_id INTEGER
        REFERENCES blog_posts ON DELETE CASCADE  
);

CREATE TABLE favorites(
    username VARCHAR(25)
        REFERENCES users ON DELETE CASCADE,
    post_id INTEGER
        REFERENCES blog_posts ON DELETE CASCADE,
    PRIMARY KEY (username, post_id)
);



