import { Form } from '@remix-run/react';
import React, { useContext } from 'react';
import { getUser } from '~/utils/session.server';
import { useOptionalUser } from '~/utils/utils';

function Navbar({ setOpened, theme, changeTheme }: { setOpened: any; theme: string; changeTheme: (a: string) => void }) {
	let hebrewThemes = [
		'בהיר',
		'כהה',
		'מאפין',
		'דבורים',
		'אמרלד',
		'תאגיד',
		'מסיבה',
		'רטרו',
		'סייברפאנק',
		'אָהוּב',
		'הלאווין',
		'גן',
		'יַעַר',
		'אקווה',
		'רגוע',
		'פסטל',
		'פנטזיה',
		'עיתון',
		'שחור',
		'יוקרתי',
		'דרקולה',
		'צבעוני',
		'סתָיו',
		'עסקי',
		'חומצה',
		'לימונדה',
		'לילה',
		'קפה',
		'חוֹרֶף',
	];
	let englishThemes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter',
	];
	const user = useOptionalUser();
	return (
		<div className='navbar shadow-lg max-h-[6%] backdrop-blur'>
			<div className='navbar-start lg:hidden'>
				<label htmlFor='my-drawer-2' className='btn btn-ghost drawer-button'>
					<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h7' />
					</svg>
				</label>
			</div>
			<div className='dropdown navbar-start'>
				<label tabIndex={0} className='btn btn-ghost gap-1 normal-case m-1'>
					<svg
						width='20'
						height='20'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						className='inline-block h-5 w-5 stroke-current md:h-6 md:w-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'></path>
					</svg>
					<span className='hidden md:inline'>Theme</span>
					<svg
						width='12px'
						height='12px'
						className='ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 2048 2048'>
						<path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
					</svg>
				</label>
				<div className='dropdown-content max-h-96 h-65 overflow-y-auto w-52 mt-4 bg-base-100 shadow rounded-box'>
					<div tabIndex={0} className='menu p-2 grid gap-2'>
						{hebrewThemes.map((htheme, index) => (
							<div
								className={
									'outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2' +
									(theme == englishThemes[index] ? ' border border-primary' : '')
								}
								data-set-theme={englishThemes[index]}
								key={index}
								onClick={() => changeTheme(englishThemes[index])}
								data-act-class='outline'>
								<div data-theme={englishThemes[index]} className='bg-base-100 text-base-content w-full cursor-pointer font-sans'>
									<div className='grid grid-cols-5 grid-rows-3'>
										<div className='col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4'>
											<div className='flex-grow text-sm font-bold'>{htheme}</div>
											<div className='flex flex-shrink-0 flex-wrap gap-1'>
												<div className='bg-primary w-2 rounded'></div>
												<div className='bg-secondary w-2 rounded'></div>
												<div className='bg-accent w-2 rounded'></div>
												<div className='bg-neutral w-2 rounded'></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className='navbar-center'>
				<h1 className='normal-case text-2xl font-mono font-black'>
					משוב<span className='text-xl font-mono mr-5'>2.0</span>
				</h1>
			</div>

			{/* Navabr End, Login shit */}
			<div className='navbar-end ml-12 '>
				{user?.firstName ? <p className='text-base-content text-lg'>{user?.firstName}</p> : <a className='cursor-pointer flex items-center gap-5' href='/auth'>
					{user?.firstName || <svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-[6%] w-10 p-1 stroke-base-content rounded-full border border-slate-400/50 glass bg-opacity-10'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
						/>
					</svg>}

					  <p className='text-base-content text-lg'>התחבר</p>
          </a>}
  					{user?.firstName && (
  						<Form action='/auth/logout' method='post'>
  							<button type='submit' className='btn btn-sm btn-ghost text-error mr-2'>
  								התנתק
  							</button>
  						</Form>
  					)}
			</div>
		</div>
	);
}

export default Navbar;
