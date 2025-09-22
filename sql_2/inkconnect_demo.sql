--
-- PostgreSQL database dump
--

\restrict e67CvmVAXs42kVOWmvHprQX80asUWbxZtrrDOAAJ69lH1s3OzamuvT0GE9BZp4C

-- Dumped from database version 14.19 (Homebrew)
-- Dumped by pg_dump version 14.19 (Homebrew)

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
-- Name: artists; Type: TABLE; Schema: public; Owner: ajjackson
--

CREATE TABLE public.artists (
    artist_id integer NOT NULL,
    artist_name character varying(100) NOT NULL,
    specialty character varying(100)
);


ALTER TABLE public.artists OWNER TO ajjackson;

--
-- Name: artists_artist_id_seq; Type: SEQUENCE; Schema: public; Owner: ajjackson
--

CREATE SEQUENCE public.artists_artist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.artists_artist_id_seq OWNER TO ajjackson;

--
-- Name: artists_artist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ajjackson
--

ALTER SEQUENCE public.artists_artist_id_seq OWNED BY public.artists.artist_id;


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: ajjackson
--

CREATE TABLE public.bookings (
    booking_id integer NOT NULL,
    user_id integer,
    project_id integer,
    booking_date date NOT NULL
);


ALTER TABLE public.bookings OWNER TO ajjackson;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: ajjackson
--

CREATE SEQUENCE public.bookings_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bookings_booking_id_seq OWNER TO ajjackson;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ajjackson
--

ALTER SEQUENCE public.bookings_booking_id_seq OWNED BY public.bookings.booking_id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: ajjackson
--

CREATE TABLE public.projects (
    project_id integer NOT NULL,
    project_name character varying(100) NOT NULL,
    description text,
    artist_id integer
);


ALTER TABLE public.projects OWNER TO ajjackson;

--
-- Name: projects_project_id_seq; Type: SEQUENCE; Schema: public; Owner: ajjackson
--

CREATE SEQUENCE public.projects_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_project_id_seq OWNER TO ajjackson;

--
-- Name: projects_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ajjackson
--

ALTER SEQUENCE public.projects_project_id_seq OWNED BY public.projects.project_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ajjackson
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO ajjackson;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: ajjackson
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO ajjackson;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ajjackson
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: artists artist_id; Type: DEFAULT; Schema: public; Owner: ajjackson
--

ALTER TABLE ONLY public.artists ALTER COLUMN artist_id SET DEFAULT nextval('public.artists_artist_id_seq'::regclass);


--
-- Name: bookings booking_id; Type: DEFAULT; Schema: public; Owner: ajjackson
--

ALTER TABLE ONLY public.bookings ALTER COLUMN booking_id SET DEFAULT nextval('public.bookings_booking_id_seq'::regclass);


--
-- Name: projects project_id; Type: DEFAULT; Schema: public; Owner: ajjackson
--

ALTER TABLE ONLY public.projects ALTER COLUMN project_id SET DEFAULT nextval('public.projects_project_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: ajjackson
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: artists; Type: TABLE DATA; Schema: public; Owner: ajjackson
--

COPY public.artists (artist_id, artist_name, specialty) FROM stdin;
1	Maya Lee	Tattoo
2	Carlos Vega	Digital Art
3	Aiko Tan	Illustration
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: ajjackson
--

COPY public.bookings (booking_id, user_id, project_id, booking_date) FROM stdin;
1	1	1	2025-09-01
2	2	2	2025-09-10
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: ajjackson
--

COPY public.projects (project_id, project_name, description, artist_id) FROM stdin;
2	Cosmic Journey	NFT series concept	2
3	Lotus Dreams	Watercolor illustration	3
1	Phoenix Rising	Updated back tattoo design concept	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ajjackson
--

COPY public.users (user_id, username, email) FROM stdin;
1	bob	bob@example.com
2	sara	sara@example.com
3	liam	liam@example.com
\.


--
-- Name: artists_artist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ajjackson
--

SELECT pg_catalog.setval('public.artists_artist_id_seq', 3, true);


--
-- Name: bookings_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ajjackson
--

SELECT pg_catalog.setval('public.bookings_booking_id_seq', 3, true);


--
-- Name: projects_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ajjackson
--

SELECT pg_catalog.setval('public.projects_project_id_seq', 3, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ajjackson
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: ajjackson
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (artist_id);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: ajjackson
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (booking_id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: ajjackson
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ajjackson
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: bookings bookings_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ajjackson
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(project_id);


--
-- Name: bookings bookings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ajjackson
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: projects projects_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ajjackson
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(artist_id);


--
-- PostgreSQL database dump complete
--

\unrestrict e67CvmVAXs42kVOWmvHprQX80asUWbxZtrrDOAAJ69lH1s3OzamuvT0GE9BZp4C

