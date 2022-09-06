import { MetaFunction, LinksFunction, LoaderArgs, json, createCookie } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData } from '@remix-run/react';
import { useState, createContext, useEffect } from 'react';
import Shell from './components/Shell';

import styles from './tailwind.css';
import { getUser } from './utils/session.server';
import { getUserByEmail, User } from '~/models/user.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Mashov',
	viewport: 'width=device-width,initial-scale=1',
});

export function CatchBoundary() {
	const caught = useCatch();

	if (caught.status === 404) {
		return (
			<div className='error-container'>
				<p>Oops! Page not found.</p>
			</div>
		);
	} else {
		return <p>Something went wrong. code: {caught.status}</p>;
	}
}

// this loader runs when app is started and its information
// can be used by all pages without the need to rerun the code!
export async function loader({ request }: LoaderArgs) {
	return json({
		user: await getUser(request),
	});
}

export default function App() {
	const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') ?? 'dark');
  }, []);

	function changeTheme(theme: string) {
		setTheme(theme);

		// change local storage
		localStorage.setItem('theme', theme);
	}

	return (
		<Document theme={theme}>
			<Shell theme={theme} changeTheme={changeTheme}>
				<Outlet />
			</Shell>
		</Document>
	);
}

function Document({ children, theme }: { children: React.ReactNode; theme: string }) {
	return (
		<html dir='rtl' data-theme={theme}>
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
