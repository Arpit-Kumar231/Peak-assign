import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getRandomColors } from "../../helpers/getRandomColors";

interface Tag {
  title: string;
  bg: string;
  text: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
  handleUpdateTask: (updatedTask: any) => void;
}

const EditModal = ({
  isOpen,
  onClose,
  task,
  handleUpdateTask,
}: EditModalProps) => {
  const [currentTaskData, setCurrentTaskData] = useState(task);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (task) {
      setCurrentTaskData(task);
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setCurrentTaskData({ ...currentTaskData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setCurrentTaskData({
            ...currentTaskData,
            image: e.target.result as string,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      const { bg, text } = getRandomColors();
      const updatedTags = [
        ...(currentTaskData.tags || []),
        { title: newTag, bg, text },
      ];
      setNewTag("");
      setCurrentTaskData({ ...currentTaskData, tags: updatedTags });
    }
  };

  const handleSave = () => {
    handleUpdateTask(currentTaskData);
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md z-60"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
        <input
          type="text"
          name="title"
          value={currentTaskData?.title || ""}
          placeholder="Task Title"
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-gray-800 mb-3"
        />
        <textarea
          name="description"
          value={currentTaskData?.description || ""}
          placeholder="Task Description"
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-gray-800 mb-3 h-24"
        ></textarea>
        <select
          name="priority"
          value={currentTaskData?.priority || ""}
          onChange={handleChange}
          className="w-full border rounded px-2 py-2 text-gray-800 mb-3"
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="number"
          name="deadline"
          value={currentTaskData?.deadline || ""}
          placeholder="Deadline (e.g., 3 days)"
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-gray-800 mb-3"
        />
        <div className="flex gap-2 items-center mb-3">
          <input
            type="text"
            value={newTag}
            placeholder="Add Tag"
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-grow border rounded px-3 py-2 text-gray-800"
          />
          <button
            onClick={handleAddTag}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Add Tag
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {currentTaskData?.tags &&
            currentTaskData.tags.map((tag: Tag, index: number) => (
              <span
                key={index}
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: tag.bg, color: tag.text }}
              >
                {tag.title}
              </span>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-3 items-center mb-4">
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="text-gray-800"
          />
          <input
            type="text"
            name="alt"
            value={currentTaskData?.alt || ""}
            placeholder="Image Alt Text"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-800"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditModal;
