DROP TABLE IF EXISTS stats;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
    is_admin BOOL DEFAULT 'f'
);

CREATE TABLE post (
	post_id serial PRIMARY KEY,
    post_date TIMESTAMP,
    title VARCHAR ( 255 ) NOT NULL,
	topic VARCHAR ( 255 ) NOT NULL,
    content VARCHAR ( 255 ) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES account (user_id)
);

CREATE TABLE comment (
	comment_id serial PRIMARY KEY,
    content VARCHAR ( 255 ) NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES account (user_id),
    FOREIGN KEY (post_id)
      REFERENCES post (post_id)
);

CREATE TABLE stats (
  stats_id serial PRIMARY KEY,
  method VARCHAR ( 255 ) NOT NULL, 
  endpoint VARCHAR ( 255 ) NOT NULL,
  requests INT DEFAULT 0
);

INSERT INTO account (username, password, email, is_admin) VALUES('admin','password','admin@email.com', 't');
INSERT INTO account (username, password, email) VALUES('johndoe','password','johndoe@email.com');
INSERT INTO account (username, password, email) VALUES('pparker','password','pparker@email.com');

INSERT INTO post (post_date, title, topic, content, user_id) VALUES('2020-04-22 19:10:25','best pizza in vancouver', 'pizza', 'papa johns has the best pizza', 2);
INSERT INTO post (post_date, title, topic, content, user_id) VALUES('2021-01-22 12:30:00','dogs or cats', 'pets', 'dogs are honestly better but prove me wrong', 3);

INSERT INTO comment (content, user_id, post_id) VALUES('freshlice is better', 3, 1);
INSERT INTO comment (content, user_id, post_id) VALUES('cats are better! purr', 2, 2);


INSERT INTO stats (method, endpoint) VALUES('GET', '/comment/id');
INSERT INTO stats (method, endpoint) VALUES('GET', '/post/id');
INSERT INTO stats (method, endpoint) VALUES('GET', '/post/all');
INSERT INTO stats (method, endpoint) VALUES('GET', '/stats');

INSERT INTO stats (method, endpoint) VALUES('POST', '/account');
INSERT INTO stats (method, endpoint) VALUES('POST', '/admin');
INSERT INTO stats (method, endpoint) VALUES('POST', '/comment');
INSERT INTO stats (method, endpoint) VALUES('POST', '/login');
INSERT INTO stats (method, endpoint) VALUES('POST', '/post');

INSERT INTO stats (method, endpoint) VALUES('PUT', '/post');
INSERT INTO stats (method, endpoint) VALUES('PUT', '/comment');
INSERT INTO stats (method, endpoint) VALUES('PUT', '/stats');

INSERT INTO stats (method, endpoint) VALUES('DELETE', '/post');
INSERT INTO stats (method, endpoint) VALUES('DELETE', '/comment');