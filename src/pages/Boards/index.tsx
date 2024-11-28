/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

import { Board } from "../../data/board";
import { Columns } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import EditModal from "../../components/Modals/EditModal";

const Home = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [currentColumn, setCurrentColumn] = useState<string>("");
  const [columns, setColumns] = useState<Columns>(() => {
    if (typeof window !== "undefined") {
      const storedColumns = localStorage.getItem("columns");
      if (storedColumns) {
        return JSON.parse(storedColumns);
      }
    }
    return Board;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("columns", JSON.stringify(columns));
    }
  }, [columns]);

  const openModal = (columnId: any) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const openEditModal = (columnId: string, taskId: string) => {
    const taskToEdit = columns[columnId].items.find(
      (task: any) => task.id === taskId
    );
    setCurrentTask(taskToEdit);
    setCurrentColumn(columnId);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setCurrentTask(null);
    setCurrentColumn("");
  };
  const handleUpdateTask = (updatedTask: any) => {
    const newColumns = { ...columns };
    const columnTasks = newColumns[currentColumn].items;
    const taskIndex = columnTasks.findIndex(
      (task: any) => task.id === updatedTask.id
    );

    if (taskIndex !== -1) {
      columnTasks[taskIndex] = updatedTask;
      setColumns(newColumns);
    }
    closeEditModal();
  };

  const handleAddTask = (taskData: any) => {
    const newBoard = { ...columns };
    newBoard[selectedColumn].items.push(taskData);
    setColumns(newBoard);
  };
  return (
    <>
      <DragDropContext
        onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
      >
        <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
          {Object.entries(columns).map(([columnId, column]: any) => (
            <div className="w-full flex flex-col gap-0" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>
                    {column.items.map((task: any, index: any) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided: any) => (
                          <>
                            <Task
                              provided={provided}
                              task={task}
                              onClick={() => openEditModal(columnId, task.id)}
                            />
                          </>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div
                onClick={() => openModal(columnId)}
                className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
              >
                <AddOutline color={"#555"} />
                Add Task
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />
      <EditModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        task={currentTask}
        handleUpdateTask={handleUpdateTask}
      />
    </>
  );
};

export default Home;
