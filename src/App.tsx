import React, {DragEvent, useState} from 'react';
import {v1} from 'uuid';
import './App.css';

type ItemType = {
  id: string, order: number, name: string
}
type BoardType = {
  id: string, title: string,
  items: ItemType[]
}
const App = () => {
  const [boards, setBoards] = useState<BoardType[]>([
    {
      id: v1(), title: 'Users', items: [{id: v1(), order: 1, name: 'Bob'},
        {id: v1(), order: 2, name: 'Mike'},
        {id: v1(), order: 3, name: 'Frank'},]
    },
    {
      id: v1(), title: 'Mentors', items: [{id: v1(), order: 1, name: 'Bobby'},
        {id: v1(), order: 2, name: 'Mikes'},
        {id: v1(), order: 3, name: 'Franks'},]
    }

  ])
  const [currentBoard, setCurrentBoards] = useState<any>()
  const [currentItem, setCurrentItem] = useState<any>()
  const onDragOverHandle = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  const onDragLeaveHandle = (e: DragEvent<HTMLDivElement>) => {
  }
  const onDragStartHandle = (e: DragEvent<HTMLDivElement>, board: BoardType, item: ItemType) => {
    setCurrentBoards(board)
    setCurrentItem(item)
  }
  const onDragEndHandle = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  const onDropHandle = (e: DragEvent<HTMLDivElement>, board: BoardType, item: ItemType) => {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map((b: any) => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  }

  const onCardHandle = (e: DragEvent<HTMLDivElement>, board: BoardType) => {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map((b: any) => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  }
  return (
    <div className={'wrapper'}>
      {boards.map((board =>
          <div key={board.id} className={'board__wrapper'}
               onDragOver={(e) => onDragOverHandle(e)}
               onDrop={(e) => onCardHandle(e, board)}>
            <h4 className={'board__title'}>{board.title}</h4>
            {board.items.map((item =>
                <div draggable
                     onDragOver={(e) => onDragOverHandle(e)}
                     onDragLeave={(e) => onDragLeaveHandle(e)}
                     onDragStart={(e) => onDragStartHandle(e, board, item)}
                     onDragEnd={(e) => onDragEndHandle(e)}
                     onDrop={(e) => onDropHandle(e, board, item)}
                     key={item.id} className={'board__item'}>{item.name}</div>
            ))}
          </div>
      ))}
    </div>
  );
}

export default App;
