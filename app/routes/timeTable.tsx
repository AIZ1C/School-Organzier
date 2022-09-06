import { json, redirect } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({request: req }) => {
  
}

export const action: ActionFunction = async ({request: req }) => {
  
}

const TimeTable = () => {
  const actionData = useActionData();
  const loaderData = useLoaderData();
  return (
    <p>This is TimeTable</p>
  )
}

export default TimeTable