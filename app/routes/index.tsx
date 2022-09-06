import { json, redirect } from '@remix-run/node';
import { Link, useActionData, useLoaderData } from '@remix-run/react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';

const Index = () => {
	return (
		<div>
			<div className='hero bg-gradient-to-tr from-secondary via-accent-focus to-primary text-primary-content h-[60vh]'>
				<div className='hero-content w-full'>
					<div className='text-center'>
						<h1 className='text-8xl font-bold '>
							ניהול משימות <span className='underline decoration-cyan-400'>בקלות</span>
						</h1>
						<h2 className='py-12 text-2xl'>מערכת מתקדמת לניהול משימות ושיעורי בית </h2>
						<div className='glass w-fit rounded-lg mx-auto'>
							<span className='text-primary-content mx-4'>התחל עכשיו</span>
							<a href='/auth' className='btn btn-primary'>
								צור חשבון
							</a>
						</div>
					</div>
				</div>
			</div>

			<Link to='auth' className='link link-accent text-lg'>
				התחבר או צור חשבון חדש
			</Link>
			<br />
			<Link to='tasks' className='link link-accent text-lg'>
				צור משימות
			</Link>
		</div>
	);
};

export default Index;
