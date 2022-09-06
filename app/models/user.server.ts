import type { Password, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { db } from '~/utils/db.server';

export type { User } from '@prisma/client';

export async function getUserById(id: User['id']) {
	return db.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User['email']) {
	return db.user.findUnique({ where: { email } });
}

export async function createUser(details: Pick<User, 'firstName' | 'lastName' | 'email'>, password: string) {
	const hashedPassword = await bcrypt.hash(password, 10);

	return db.user.create({
		data: {
			...details,
			password: {
				create: {
					hash: hashedPassword,
				},
			},
		},
	});
}

export async function deleteUserByEmail(email: User['email']) {
	return db.user.delete({ where: { email } });
}

export async function verifyLogin(email: User['email'], password: Password['hash']): Promise< Omit<User, 'password'> | null > {
	const userWithPassword = await db.user.findUnique({
		where: { email },
		include: {
			password: true,
		},
	});

	if (!userWithPassword || !userWithPassword.password) {
		return null;
	}

	const isValid = await bcrypt.compare(password, userWithPassword.password.hash);

	if (!isValid) {
		return null;
	}

	const { password: _password, ...userWithoutPassword } = userWithPassword;

	return userWithoutPassword;
}
