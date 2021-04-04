DROP TABLE IF EXISTS stats;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 255 ) NOT NULL,
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