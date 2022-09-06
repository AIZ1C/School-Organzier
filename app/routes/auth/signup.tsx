import { ActionFunction, json } from "@remix-run/node";
import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession } from "~/utils/session.server";
import { emailIsFine } from './../../utils/utils';

function badRequest(error: string, code: number) {
  console.log("ERROR: " + error + ' CODE: ' + code)
	return json({ error }, {status: code});
}


export const action: ActionFunction = async ({ request: req }) => {
	const form = await req.formData();
	// signing in
	let [remember, firstName, lastName, email, password] = [
		form.get('remember'),
		form.get('firstName'),
		form.get('lastName'),
		form.get('email'),
		form.get('password'),
	] as string[];

	if (typeof password !== 'string' || password.length < 8 || !emailIsFine(email)) {
		return badRequest('Bad credentials!', 400);
	}

	// check if email is used
	const possibleUser = await getUserByEmail(email);

	if (possibleUser != null) return badRequest('Email used!', 400);

	// create new user now
	const user = await createUser({ firstName, lastName, email }, password);

	return createUserSession({
		request: req,
		userId: user.id,
		remember: remember == 'on',
		redirectTo: '/',
	});
};
