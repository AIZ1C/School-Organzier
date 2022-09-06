import { NavLink } from '@remix-run/react';
import React, { useState } from 'react';
import Navbar from './Navigation/Navbar';
import Sidebar from './Navigation/Sidebar';

function Shell({ children, theme, changeTheme }: { children: React.ReactNode, theme: string, changeTheme: (a: string) => void }) {
	const [opened, setOpened] = useState(true);
	return (
		<div className='drawer drawer-mobile'>
			<input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content flex flex-col  scroll-pt-20'>
				{/* Page content here */}
				<Navbar setOpened={setOpened} theme={theme} changeTheme={changeTheme} />
				{children}
			</div>
			<div className='drawer-side'>
				<Sidebar />
			</div>
		</div>
	);
}

export default Shell;
