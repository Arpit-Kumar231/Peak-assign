/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimeOutline } from "react-ionicons";
import { TaskT } from "../../types";

interface TaskProps {
    task: TaskT;
    provided: any;
    onClick: () => void;
}

const Task = ({ task, provided, onClick }: TaskProps) => {
    const { title, description, priority, deadline, image, alt, tags } = task;

    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={onClick}
            className="w-full cursor-grab bg-zinc-800 hover:bg-zinc-700/80 flex flex-col justify-between gap-3 items-start shadow-md rounded-xl px-3 py-4 transition-colors border border-zinc-700"
        >
            {image && alt && (
                <img
                    src={image}
                    alt={alt}
                    className="w-full h-[170px] rounded-lg object-cover"
                />
            )}
            <div className="flex items-center gap-2 flex-wrap">
                {tags.map((tag) => (
                    <span
                        key={tag.title}
                        className="px-[10px] py-[2px] text-[13px] font-medium rounded-md"
                        style={{ backgroundColor: tag.bg, color: tag.text }}
                    >
                        {tag.title}
                    </span>
                ))}
            </div>
            <div className="w-full flex items-start flex-col gap-1">
                <span className="text-[15.5px] font-medium text-zinc-100">
                    {title}
                </span>
                <span className="text-[13.5px] text-zinc-400">
                    {description}
                </span>
            </div>
            <div className="w-full border-t border-dashed border-zinc-600"></div>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <TimeOutline
                        color="#A1A1AA"
                        width="19px"
                        height="19px"
                    />
                    <span className="text-[13px] text-zinc-400">
                        {deadline} mins
                    </span>
                </div>
                <div
                    className={`w-[60px] rounded-full h-[5px] ${
                        priority === "high"
                            ? "bg-red-500"
                            : priority === "medium"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                    }`}
                ></div>
            </div>
        </div>
    );
};

export default Task;
