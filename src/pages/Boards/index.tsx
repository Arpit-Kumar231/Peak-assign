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
  const [newColumnName, setNewColumnName] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);

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

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      const columnId = `column-${Object.keys(columns).length + 1}`;
      const newColumns = {
        ...columns,
        [columnId]: {
          name: newColumnName,
          items: [],
        },
      };
      setColumns(newColumns);
      setNewColumnName("");
      setIsAddingColumn(false);
    }
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
      >
        <div className="w-full flex flex-col md:flex-row items-start md:justify-between px-5 pb-8 gap-8 bg-[#1a1a1a] flex-wrap">
          {Object.entries(columns).map(([columnId, column]: any) => (
            <div
              className="w-full md:w-[290px] min-w-[250px] flex flex-col gap-0"
              key={columnId}
            >
              <Droppable droppableId={columnId} key={columnId}>
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col w-full gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-[#2d2d2d] rounded-lg shadow-lg text-gray-200 font-medium text-[15px]">
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
                className="flex cursor-pointer items-center justify-center gap-1 py-[10px] w-[90%] mx-auto bg-[#2d2d2d] rounded-lg shadow-lg text-gray-200 font-medium text-[15px] hover:bg-[#3d3d3d] transition-colors duration-200"
              >
                <AddOutline color={"#e5e5e5"} />
                Add Task
              </div>
            </div>
          ))}

          {/* Add Column Section */}
          <div className="w-full md:w-[290px] min-w-[250px]">
            {isAddingColumn ? (
              <div className="flex flex-col gap-2 p-5 bg-[#2d2d2d] rounded-lg">
                <input
                  type="text"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  placeholder="Enter column name"
                  className="p-2 rounded bg-[#3d3d3d] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddColumn}
                    className="flex-1 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition-colors duration-200"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setIsAddingColumn(false)}
                    className="flex-1 py-2 bg-gray-500 rounded text-white hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsAddingColumn(true)}
                className="flex cursor-pointer items-center justify-center gap-1 py-[10px] w-full bg-[#2d2d2d] rounded-lg shadow-lg text-gray-200 font-medium text-[15px] hover:bg-[#3d3d3d] transition-colors duration-200"
              >
                <AddOutline color={"#e5e5e5"} />
                Add Column
              </div>
            )}
          </div>
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
