--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.2

-- Started on 2021-04-10 23:42:51

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 31392940)
-- Name: account; Type: TABLE; Schema: public; Owner: lubqysmcohxfjm
--

CREATE TABLE public.account (
    user_id integer NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    is_admin boolean DEFAULT false
);


ALTER TABLE public.account OWNER TO lubqysmcohxfjm;

--
-- TOC entry 200 (class 1259 OID 31392938)
-- Name: account_user_id_seq; Type: SEQUENCE; Schema: public; Owner: lubqysmcohxfjm
--

CREATE SEQUENCE public.account_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_user_id_seq OWNER TO lubqysmcohxfjm;

--
-- TOC entry 4022 (class 0 OID 0)
-- Dependencies: 200
-- Name: account_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lubqysmcohxfjm
--

ALTER SEQUENCE public.account_user_id_seq OWNED BY public.account.user_id;


--
-- TOC entry 205 (class 1259 OID 31392971)
-- Name: comment; Type: TABLE; Schema: public; Owner: lubqysmcohxfjm
--

CREATE TABLE public.comment (
    comment_id integer NOT NULL,
    content character varying(255) NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL
);


ALTER TABLE public.comment OWNER TO lubqysmcohxfjm;

--
-- TOC entry 204 (class 1259 OID 31392969)
-- Name: comment_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: lubqysmcohxfjm
--

CREATE SEQUENCE public.comment_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_comment_id_seq OWNER TO lubqysmcohxfjm;

--
-- TOC entry 4023 (class 0 OID 0)
-- Dependencies: 204
-- Name: comment_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lubqysmcohxfjm
--

ALTER SEQUENCE public.comment_comment_id_seq OWNED BY public.comment.comment_id;


--
-- TOC entry 203 (class 1259 OID 31392954)
-- Name: post; Type: TABLE; Schema: public; Owner: lubqysmcohxfjm
--

CREATE TABLE public.post (
    post_id integer NOT NULL,
    post_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    title character varying(255) NOT NULL,
    topic character varying(255) NOT NULL,
    content character varying(255) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.post OWNER TO lubqysmcohxfjm;

--
-- TOC entry 202 (class 1259 OID 31392952)
-- Name: post_post_id_seq; Type: SEQUENCE; Schema: public; Owner: lubqysmcohxfjm
--

CREATE SEQUENCE public.post_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_post_id_seq OWNER TO lubqysmcohxfjm;

--
-- TOC entry 4024 (class 0 OID 0)
-- Dependencies: 202
-- Name: post_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lubqysmcohxfjm
--

ALTER SEQUENCE public.post_post_id_seq OWNED BY public.post.post_id;


--
-- TOC entry 207 (class 1259 OID 31392989)
-- Name: stats; Type: TABLE; Schema: public; Owner: lubqysmcohxfjm
--

CREATE TABLE public.stats (
    stats_id integer NOT NULL,
    method character varying(255) NOT NULL,
    endpoint character varying(255) NOT NULL,
    requests integer DEFAULT 0
);


ALTER TABLE public.stats OWNER TO lubqysmcohxfjm;

--
-- TOC entry 206 (class 1259 OID 31392987)
-- Name: stats_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: lubqysmcohxfjm
--

CREATE SEQUENCE public.stats_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stats_stats_id_seq OWNER TO lubqysmcohxfjm;

--
-- TOC entry 4025 (class 0 OID 0)
-- Dependencies: 206
-- Name: stats_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lubqysmcohxfjm
--

ALTER SEQUENCE public.stats_stats_id_seq OWNED BY public.stats.stats_id;


--
-- TOC entry 3858 (class 2604 OID 31392943)
-- Name: account user_id; Type: DEFAULT; Schema: public; Owner: lubqysmcohxfjm
--

ALTER TABLE ONLY public.account ALTER COLUMN user_id SET DEFAULT nextval('public.account_user_id_seq'::regclass);


--
-- TOC entry 3862 (class 2604 OID 31392974)
-- Name: comment comment_id; Type: DEFAULT; Schema: public; Owner: lubqysmcohxfjm
--

ALTER TABLE ONLY public.comment ALTER COLUMN comment_id SET DEFAULT nextval('public.comment_comment_id_seq'::regclass);


--
-- TOC entry 3860 (class 2604 OID 31392957)
-- Name: post post_id; Type: DEFAULT; Schema: public; Owner: lubqysmcohxfjm
--

ALTER TABLE ONLY public.post ALTER COLUMN post_id SET DEFAULT nextval('public.post_post_id_seq'::regclass);


--
-- TOC entry 3863 (class 2604 OID 31392992)
-- Name: stats stats_id; Type: DEFAULT; Schema: public; Owner: lubqysmcohxfjm
--

ALTER TABLE ONLY public.stats ALTER COLUMN stats_id SET DEFAULT nextval('public.stats_stats_id_seq'::regclass);


--
-- TOC entry 4009 (class 0 OID 31392940)
-- Dependencies: 201
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: lubqysmcohxfjm
--

COPY public.account (user_id, password, email, is_admin) FROM stdin;
1	$2b$10$bvdv/UTLZe6hXRz46mXNPO7GrVnXztNE4z6d9ErmHXhGJ/KMsHecG	admin@something.com	t
2	$2b$10$1hdvI7mRV1XqELHpTuKZsOwivCsgxlJk/wVghvV4xXOd0mWo21UDa	mikhaela@something.com	f
3	$2b$10$9y5.jP3PlON.Usxs1N3/DuM.TqydoYjdaMkxzCjsJVhb2fZJ1B.hi	mik@something.com	f
4	$2b$10$8rxaJMynjbDzfRRgV/..keVzPl4Hjw17z4Txo3LTf6CkVgMVTchxS	mikhaela	f
\.


--
-- TOC entry 4013 (class 0 OID 31392971)
-- Dependencies: 205
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: lubqysmcohxfjm
--

COPY public.comment (comment_id, content, user_id, post_id) FROM stdin;
6	hey yall this is mikhaela!	2	1
7	A new comment on a very first post	1	1
8	awesome post there!	2	2
10	Wow an updated comment!	1	1
9	The middle one!	2	1
\.


--
-- TOC entry 4011 (class 0 OID 31392954)
-- Dependencies: 203
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: lubqysmcohxfjm
--

COPY public.post (post_id, post_date, title, topic, content, user_id) FROM stdin;
2	2021-04-11 05:08:20.248369	The bizzbuzz	foobar	Some super awesome content	1
1	2021-04-11 05:07:36.253952	This is my very first post!	miscellaneous	I'm very excited to use this website! edited by admin	2
\.


--
-- TOC entry 4015 (class 0 OID 31392989)
-- Dependencies: 207
-- Data for Name: stats; Type: TABLE DATA; Schema: public; Owner: lubqysmcohxfjm
--

COPY public.stats (stats_id, method, endpoint, requests) FROM stdin;
13	POST	/v1/comment	11
15	PUT	/v1/comment	12
9	GET	/v1/post	50
6	POST	/v1/post	4
11	PUT	/v1/post	5
12	DELETE	/v1/post	8
10	GET	/v1/comment	60
8	GET	/v1/account	2
1	GET	/	5
2	GET	/v1/stats	9
7	GET	/v2/posts	2
4	GET	/v1/post/all	52
5	POST	/v1/login	21
3	POST	/v1/register	8
14	DELETE	/v1/comment	9
\.


--
-- TOC entry 4026 (class 0 OID 0)
-- Dependencies: 200
-- Name: account_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lubqysmcohxfjm
--

SELECT pg_catalog.setval('public.account_user_id_seq', 4, true);


--
-- TOC entry 4027 (class 0 OID 0)
-- Dependencies: 204
-- Name: comment_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lubqysmcohxfjm
--

SELECT pg_catalog.setval('public.comment_comment_id_seq', 10, true);


--
-- TOC entry 4028 (class 0 OID 0)
-- Dependencies: 202
-- Name: post_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lubqysmcohxfjm
--

SELECT pg_catalog.setval('public.post_post_id_seq', 4, true);


--
-- TOC entry 4029 (class 0 OID 0)
-- Dependencies: 206
-- Name: stats_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lubqysmcohxfjm
--

SELECT pg_catalog.setval('public.stats_stats_id_seq', 15, true);


--
-- TOC entry 3866 (class 2606 OID 31392951)
-- Name: account account_email_key; Type: CONSTRAINT; Schema: public; Owner: lubqysmcohxfjm
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_email_key UNIQUE (email);


--
-- TOC entry 3868 (class 2606 OID 31392949)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: lubqysmcohxfjm
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3872 (class 2606 OID 31392976)
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: lubqysmcohxfjm
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 3870 (class 2606 OID 31392963)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: lubqysmcohxfjm
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (post_id);


--
-- TOC entry 3874 (class 2606 OID 31392998)
-- Name: stats stats_pkey; Type: CONSTRAINT; Schema: public; Owner: lubqysmcohxfjm
--

ALTER TABLE ONLY public.stats
    ADD CONSTRAINT stats_pkey PRIMARY KEY (stats_id);


--
-- TOC entry 3877 (class 2606 OID 31392982)
-- Name: comment comment_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lubqysmcohxfjm
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.post(post_id);


--
-- TOC entry 3876 (class 2606 OID 31392977)
-- Name: comment comment_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lubqysmcohxfjm
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.account(user_id);


--
-- TOC entry 3875 (class 2606 OID 31392964)
-- Name: post post_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lubqysmcohxfjm
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.account(user_id);


--
-- TOC entry 4021 (class 0 OID 0)
-- Dependencies: 649
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO lubqysmcohxfjm;


-- Completed on 2021-04-10 23:43:02

--
-- PostgreSQL database dump complete
--

