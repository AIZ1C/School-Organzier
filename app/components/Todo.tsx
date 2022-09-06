import type { Todo } from '@prisma/client'
import React from 'react'

const TodoC: React.FC<{todo: Todo}> = ({todo}) => {
  let colors = ["border-gray-100", "border-green-400", "border-lime-400", "border-yellow-400", "border-orange-400", "border-red-400"]
  let c = "card border-2  max-w-lg w-1/2 " + colors[todo.rating]
  let dateString = new Date(todo.dueDate).toDateString()
  return (
    <div className={c}>
      <div className='flex flex-wrap m-5'><h2 className='card-title ml-auto'>{todo.title}</h2><p className='w-fit mute'>{dateString}</p></div>
      <p className='card-body p-0 mx-5 mb-5'>{todo.body}</p>
    </div>
  )
}

export default TodoC; 