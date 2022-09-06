import { json, redirect, LoaderArgs } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { useState } from 'react';
import { emailIsFine } from '../../utils/utils';
import { createUser, getUserByEmail, verifyLogin } from '~/models/user.server';
import { createUserSession } from '~/utils/session.server';

// export const loader: LoaderFunction = async ({ request: req }) => {}; // check for cookies here or somting idk

export const loader: LoaderFunction = async ({ params, request }) => {
	const url = new URL(request.url);
	const problem = url.searchParams.get('p');
	return problem;
};

const Login = () => {
	const params = useLoaderData<LoaderArgs>();
  if (params) console.log('hi')
	const actionData = useActionData();
	// const loaderData = useLoaderData();
	const [login, setLogin] = useState(true);

	const [password, setPassword] = useState('');
	const [pwVerify, setPwVerify] = useState('');
	const [error, setError] = useState('');

	function checkForErrors(): void {
		if (password.length > 0 && password.length <= 8) setError('הסיסמה קצרה מדי, חובה לעקוף 8 אותיות');
		else if (password != pwVerify) setError('הסיסמאות לא תואמות');
		else setError('');
	}

	return (
		<div className='py-12 prose xl:w-[35vh] mx-auto text-primary-content'>
			{params && (
				<div className='alert alert-warning shadow-lg mb-12'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='stroke-current flex-shrink-0 h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
							/>
						</svg>
						<span>עליך להתחבר לאתר על מנת להמשיך</span>
				</div>
			)}
			<h1 className='text-base-content font-bold text-center'>כניסה למשתמש</h1>
			<div className='tabs mx-auto text-lg flex items-center'>
				<button onClick={() => setLogin(true)} className={`tab text-lg w-1/2 tab-bordered ${login && 'tab-active'}`}>
					התחברות
				</button>
				<button onClick={() => setLogin(false)} className={`tab text-lg w-1/2 tab-bordered   ${!login && 'tab-active'}`}>
					הרשמה
				</button>
			</div>
			<div className='text-base-content'>
				<Form className='form-control' method='post' action={login ? '/auth/login' : '/auth/signup'}>
					<input type='hidden' name='isLogin' value={login.toString()} hidden />
					{!login && (
						<>
							<label htmlFor='firstName' className='label'>
								שם:
							</label>
							<input type='text' name='firstName' className='input input-primary' />
							<label htmlFor='lastName' className='label'>
								שם משפחה:
							</label>
							<input type='text' name='lastName' className='input input-primary' />
						</>
					)}
					<label htmlFor='email' className='label'>
						דוא"ל:
					</label>
					<input type='text' name='email' className='input input-primary' />
					<label htmlFor='password' className='label'>
						סיסמה:
					</label>
					<input
						type='password'
						name='password'
						className='input input-primary'
						value={password}
						autoComplete='on'
						onChange={e => {
							setPassword(e.target.value);
							checkForErrors();
						}}
					/>
					{!login && (
						<>
							<label htmlFor='password-repeat' className='label'>
								חזור על הסיסמה:
							</label>
							<input
								type='password'
								name='password-repeat'
								className='input input-primary'
								value={pwVerify}
								onChange={e => {
									setPwVerify(e.target.value);
									checkForErrors();
								}}
							/>
							<p className='text-error m-0'>{error}</p>
						</>
					)}
					<p className='text-error m-0'>{actionData?.error}</p>
					<label htmlFor='remember' className='label cursor-pointer my-1'>
						<span className='label-text'>זכרו אותי</span>
						<input id='remember' name='remember' type='checkbox' className='checkbox checkbox-primary' defaultChecked />
					</label>
					<input
						type='submit'
						className='btn glass bg-primary/25 hover:bg-primary/20 mt-8 text-base-content shadow hover:border-primary'
					/>
				</Form>
			</div>
		</div>
	);
};

export default Login;
