CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    img TEXT,
    password TEXT NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    img TEXT NOT NULL,
    post_date DATE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);