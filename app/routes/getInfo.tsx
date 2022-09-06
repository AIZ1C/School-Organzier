import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/node';
import { Form, useActionData, useLoaderData, useCatch } from '@remix-run/react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { get, loginInfo, loginToMashov } from '~/utils/mashov api/methods';
import { endpoints } from '~/utils/mashov api/endpoints';
import { requireUserId } from '~/utils/session.server';
import { RemixErrorBoundary } from '@remix-run/react/dist/errorBoundaries';

export const loader: LoaderFunction = async ({ request: req }) => {
	const userId = await requireUserId(req, '/auth?p=e');
	return {};
};
export const action: ActionFunction = async ({ request: req }) => {
	const fD = await req.formData()
	const [semel, year, username, password] = [fD.get('semel'), fD.get('year'), fD.get('username'), fD.get('password')] as string[]
	console.log([semel, year, username, password])

	const info = await loginToMashov(semel, year, username, password)
	console.log('okay after info')
  
  console.log("🚀 ~ file: getInfo.tsx ~ line 22 ~ constaction:ActionFunction= ~ data", info.data)

	const grades = await get(info, 'grades')
	console.log('okay after grades')
  
	// const lessons = await get(info, 'groups')
	// console.log('okay after lessons')

	return grades 
};

const GetInfo = () => {
	const data = useActionData();
	console.dir(data);

	return (
		<div className='prose mx-auto'>
			<h1 className='text-center'>חיבור משוב</h1>
			<h2>מלאו את הפרטים כדי לחבר את חשבון המשוב שלכם</h2>
			<Form className='foem-control' method='post' action='/getInfo'>
				<label className=''>
					<p>שם משתמש</p>
					<input type='text' name='username' className='input input-primary' required defaultValue='215546854' />
				</label>
				<br />
				<label>
					<p>סיסמה</p>
					<input type='text' name='password' className='input input-primary' required defaultValue='Max23517' />
				</label>
				<br />
				<label>
					<p>שנה</p>
					<input type='text' name='year' className='input input-primary' required defaultValue='2022' />
				</label>
				<br />
				<p>בית ספר</p>
				<select name='semel' className='select select-primary' required>
					<option value={441238}>רבין</option>
					<option value={444117}>הרצוג</option>
				</select>
				<br />
				<br />
				<button className='btn btn-primary'>שליחה</button>
			</Form>
			Hello {data ? data.map((grade: any) => <p>{grade.subjectName} - {grade.grade}</p>) : 'hi'}
		</div>
	);
};

export function ErrorBoundary({ error }: { error: Error }) {
	return (
		<div>
			<h1>Error</h1>
			<p>{error.name}</p>
			<p>{error.message}</p>
			<p>The stack trace is:</p>
			<div className='w-fit'>
				{' '}
				<pre dir='ltr'>{error.stack}</pre>
			</div>
		</div>
	);
}

export function CatchBoundary() {
	const caught = useCatch();

	return (
		<div>
			<h1>Caught</h1>
			<p>Status: {caught.status}</p>
			<pre>
				<code>{caught.data}</code>
			</pre>
		</div>
	);
}

export default GetInfo;
