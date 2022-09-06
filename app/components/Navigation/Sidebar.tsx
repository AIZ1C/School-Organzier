import { NavLink } from '@remix-run/react';
import React from 'react';

function Sidebar() {
	return (
		<>
			<label htmlFor='my-drawer-2' className='drawer-overlay'></label>
			<ul className='menu p-4 overflow-y-auto w-80 bg-base-200 text-base-content'>
				<h1 className='text-7xl font-mono'>
					משוב<span className='text-6xl font-thin font-sans mr-5'>2.0</span>
				</h1>
        <br />
        <hr className='border-base-content border' />
        <br />
				<div className='font-bold space-y-2'>
				  <li>
  					<NavLink to='/' >בית</NavLink>
  				</li>
  				<li>
  					<NavLink to='/tasks'>צרו משימות</NavLink>
  				</li>
  				<li>
  					<NavLink to='/auth'>התחבר</NavLink>
  				</li>
  				<li>
  					<NavLink to='/getInfo'>חיבור משוב</NavLink>
  				</li>
				</div>
			</ul>
		</>
	);
}

export default Sidebar;
