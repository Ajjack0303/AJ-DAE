--
-- PostgreSQL database dump
--

\restrict zTh7ow7fesZzFTNjhzsUbN6M6ddFaNWTVQJ0uPCNV3jWNoIpvADGeEmtDrJ0EMp

-- Dumped from database version 16.10 (Debian 16.10-1.pgdg13+1)
-- Dumped by pg_dump version 16.10 (Debian 16.10-1.pgdg13+1)

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
-- Name: artist_requests; Type: TABLE; Schema: public; Owner: inkconnect_user
--

CREATE TABLE public.artist_requests (
    request_id integer NOT NULL,
    client_id integer NOT NULL,
    artist_id integer NOT NULL,
    title character varying(100) NOT NULL,
    description text,
    status character varying(20) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.artist_requests OWNER TO inkconnect_user;

--
-- Name: artist_requests_request_id_seq; Type: SEQUENCE; Schema: public; Owner: inkconnect_user
--

CREATE SEQUENCE public.artist_requests_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.artist_requests_request_id_seq OWNER TO inkconnect_user;

--
-- Name: artist_requests_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inkconnect_user
--

ALTER SEQUENCE public.artist_requests_request_id_seq OWNED BY public.artist_requests.request_id;


--
-- Name: portfolios; Type: TABLE; Schema: public; Owner: inkconnect_user
--

CREATE TABLE public.portfolios (
    portfolio_id integer NOT NULL,
    artist_id integer NOT NULL,
    title character varying(100) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.portfolios OWNER TO inkconnect_user;

--
-- Name: portfolios_portfolio_id_seq; Type: SEQUENCE; Schema: public; Owner: inkconnect_user
--

CREATE SEQUENCE public.portfolios_portfolio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.portfolios_portfolio_id_seq OWNER TO inkconnect_user;

--
-- Name: portfolios_portfolio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inkconnect_user
--

ALTER SEQUENCE public.portfolios_portfolio_id_seq OWNED BY public.portfolios.portfolio_id;


--
-- Name: request_responses; Type: TABLE; Schema: public; Owner: inkconnect_user
--

CREATE TABLE public.request_responses (
    response_id integer NOT NULL,
    request_id integer NOT NULL,
    artist_id integer NOT NULL,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.request_responses OWNER TO inkconnect_user;

--
-- Name: request_responses_response_id_seq; Type: SEQUENCE; Schema: public; Owner: inkconnect_user
--

CREATE SEQUENCE public.request_responses_response_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.request_responses_response_id_seq OWNER TO inkconnect_user;

--
-- Name: request_responses_response_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inkconnect_user
--

ALTER SEQUENCE public.request_responses_response_id_seq OWNED BY public.request_responses.response_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: inkconnect_user
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'client'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO inkconnect_user;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: inkconnect_user
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO inkconnect_user;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inkconnect_user
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: artist_requests request_id; Type: DEFAULT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.artist_requests ALTER COLUMN request_id SET DEFAULT nextval('public.artist_requests_request_id_seq'::regclass);


--
-- Name: portfolios portfolio_id; Type: DEFAULT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.portfolios ALTER COLUMN portfolio_id SET DEFAULT nextval('public.portfolios_portfolio_id_seq'::regclass);


--
-- Name: request_responses response_id; Type: DEFAULT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.request_responses ALTER COLUMN response_id SET DEFAULT nextval('public.request_responses_response_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: artist_requests; Type: TABLE DATA; Schema: public; Owner: inkconnect_user
--

COPY public.artist_requests (request_id, client_id, artist_id, title, description, status, created_at) FROM stdin;
\.


--
-- Data for Name: portfolios; Type: TABLE DATA; Schema: public; Owner: inkconnect_user
--

COPY public.portfolios (portfolio_id, artist_id, title, description, created_at) FROM stdin;
1	1	Dragon Sleeve	Full arm dragon tattoo design	2025-09-11 16:09:51.97913
2	3	Floral Backpiece	Intricate floral patterns for back	2025-09-11 16:09:51.97913
3	1	Phoenix Chest	Phoenix rising on chest	2025-09-11 16:09:51.97913
\.


--
-- Data for Name: request_responses; Type: TABLE DATA; Schema: public; Owner: inkconnect_user
--

COPY public.request_responses (response_id, request_id, artist_id, message, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: inkconnect_user
--

COPY public.users (user_id, username, email, password_hash, role, created_at) FROM stdin;
1	alice_artist	alice@example.com	hashedpass1	artist	2025-09-11 16:09:51.973814
2	bob_client	bob@example.com	hashedpass2	client	2025-09-11 16:09:51.973814
3	charlie_artist	charlie@example.com	hashedpass3	artist	2025-09-11 16:09:51.973814
\.


--
-- Name: artist_requests_request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inkconnect_user
--

SELECT pg_catalog.setval('public.artist_requests_request_id_seq', 1, true);


--
-- Name: portfolios_portfolio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inkconnect_user
--

SELECT pg_catalog.setval('public.portfolios_portfolio_id_seq', 3, true);


--
-- Name: request_responses_response_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inkconnect_user
--

SELECT pg_catalog.setval('public.request_responses_response_id_seq', 3, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inkconnect_user
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: artist_requests artist_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.artist_requests
    ADD CONSTRAINT artist_requests_pkey PRIMARY KEY (request_id);


--
-- Name: portfolios portfolios_pkey; Type: CONSTRAINT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.portfolios
    ADD CONSTRAINT portfolios_pkey PRIMARY KEY (portfolio_id);


--
-- Name: request_responses request_responses_pkey; Type: CONSTRAINT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.request_responses
    ADD CONSTRAINT request_responses_pkey PRIMARY KEY (response_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: artist_requests artist_requests_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.artist_requests
    ADD CONSTRAINT artist_requests_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: artist_requests artist_requests_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.artist_requests
    ADD CONSTRAINT artist_requests_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: portfolios portfolios_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.portfolios
    ADD CONSTRAINT portfolios_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: request_responses request_responses_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.request_responses
    ADD CONSTRAINT request_responses_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: request_responses request_responses_request_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: inkconnect_user
--

ALTER TABLE ONLY public.request_responses
    ADD CONSTRAINT request_responses_request_id_fkey FOREIGN KEY (request_id) REFERENCES public.artist_requests(request_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict zTh7ow7fesZzFTNjhzsUbN6M6ddFaNWTVQJ0uPCNV3jWNoIpvADGeEmtDrJ0EMp

