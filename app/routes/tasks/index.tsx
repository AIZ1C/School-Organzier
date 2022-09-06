import { useActionData, useLoaderData, Form } from '@remix-run/react';
import { db } from '~/utils/db.server';
import { ActionFunction, json, LoaderFunction } from '@remix-run/node';
import TodoC from '../../components/Todo';
import type { Todo } from '@prisma/client';
import { createTodo, getUsersTodos } from '~/models/Todo.server';
import { useOptionalUser } from '~/utils/utils';
import { requireUserId } from '~/utils/session.server';

export const loader: LoaderFunction = async ({ request: req, response: res }: any) => {
  const userId = await requireUserId(req, '/auth?p=e');
	let todos = await getUsersTodos(userId);
	return json(todos);
};

type ActionData = {
	errors?: {
		title?: string;
		body?: string;
	};
};

export const action: ActionFunction = async ({ request: req, response: res }: any) => {
	const form = await req.formData();
	const [title, body, dueDate, rating]: [string, string, Date, number] = [
		form.get('title'),
		form.get('body'),
		new Date(form.get('dueDate')),
		+form.get('rating'), // dont remove the '+'
	];

	if (typeof title !== 'string' || title.length === 0) {
		return json<ActionData>({ errors: { title: 'Title is required' } }, { status: 400 });
	}

	if (typeof body !== 'string' || body.length === 0) {
		return json<ActionData>({ errors: { body: 'Body is required' } }, { status: 400 });
	}

	console.table({ title, body, dueDate: dueDate.toDateString(), rating });

  // get user Id from session
  const userId = await requireUserId(req);

	const newTodo = await createTodo({ title, body, rating, dueDate }, userId);

	return null; // return 'success!' and have a tag saying it was good
};

function Index() {
	const data = useLoaderData();
	return (
		<div className='container w-full mx-auto text-base-content'>
			<h1 className='text-4xl my-6 font-bold'>עמוד הבית</h1>
			<div className='flex flex-wrap w-full'>
				<Form className='grid gap-5 form w-1/2' method='post'>
					<h1>צור משימה חדשה</h1>
					<div className='w-2/3'>
						<h4 className='mb-2'>כותרת</h4>
						<input type='text' name='title' className='input input-primary w-full' required />
					</div>

					<h4 className='mb-2'>משימה</h4>
					<textarea rows={50} name='body' className='textarea textarea-primary w-2/3 h-36' required></textarea>
					<h4 className='mb-2'>תאריך יעד</h4>
					<input type='date' name='dueDate' className='input input-primary max-w-xs w-1/2' required />
					<div>
						<h4 className='mb-2'>דחיפות</h4>
						<div className='rating rating-lg'>
							<input type='radio' name='rating' value='0' className='mask' hidden defaultChecked />
							<input type='radio' name='rating' value='1' className='mask mask-triangle-3 bg-green-400' />
							<input type='radio' name='rating' value='2' className='mask mask-triangle-3 bg-lime-400' />
							<input type='radio' name='rating' value='3' className='mask mask-triangle-3 bg-yellow-400' />
							<input type='radio' name='rating' value='4' className='mask mask-triangle-3 bg-orange-400' />
							<input type='radio' name='rating' value='5' className='mask mask-triangle-3 bg-red-400' />
						</div>
					</div>
					<input
						type='submit'
						value='צור משימה'
						className='btn hover:border-primary border-primary shadow shadow-primary w-fit'
					/>
				</Form>

				<div className='w-1/2 grid gap-5'>
					<h1>המשימות שלך</h1>
					{data.map((todo: Todo, index: number) => (
						<TodoC key={index} todo={todo} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Index;