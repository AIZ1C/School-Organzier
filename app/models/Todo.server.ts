import type { Todo, User } from '@prisma/client';
import { db } from '~/utils/db.server';

export function getTodo({
	id,
	userId,
}: Pick<Todo, 'id'> & {
	userId: User['id'];
}) {
	return db.todo.findFirst({
		select: { id: true, body: true, title: true },
		where: { id, userId },
	});
}

export function getUsersTodos(userId: User['id']) {
	return db.todo.findMany({
		where: { userId },
		orderBy: { rating: 'desc' },
	});
}

export async function createTodo(details: Pick<Todo, 'title' | 'body' | 'rating' | 'dueDate'>, userId: User['id']) {
	return await db.todo.create({
		data: {
			...details,
			user: { connect: { id: userId } },
		},
	});
}
