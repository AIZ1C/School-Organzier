import { ActionFunction, json } from '@remix-run/node';
import { emailIsFine } from '~/utils/utils';
import { createUser, getUserByEmail, verifyLogin } from '~/models/user.server';
import { createUserSession } from '~/utils/session.server';

function badRequest(error: string, code: number) {
	console.log('ERROR: ' + error + ' CODE: ' + code);
	return json({ error }, { status: code });
}

export const action: ActionFunction = async ({ request: req }) => {
	const form = await req.formData();
	let remember = form.get('remember');
	let email = form.get('email');
	if (!emailIsFine(email)) {
		return badRequest('Invalid email', 400);
	}

	let password = form.get('password') as string;
	if (typeof password !== 'string' || password.length < 8) return badRequest('Invalid password', 400);

	// - check credentials
	let maybeUser = await verifyLogin(email, password);

	// - redirect and set session
	if (maybeUser == null) {
		return badRequest('Invalid Credentials', 400);
	} else {
		return await createUserSession({
			request: req,
			userId: maybeUser.id,
			remember: remember == 'on',
			redirectTo: '/',
		});
	}
};
