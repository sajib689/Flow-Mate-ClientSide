import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

const DragAndDropTaskManager = () => {
  const { teamName } = useLoaderData();
  const axiosCommon = UseAxiosCommon();

  const [taskLists, setTaskLists] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  // Fetch tasks by stage
  const fetchTasksByStage = async (stage) => {
    if (!teamName) throw new Error("Team name is missing");
    const { data } = await axiosCommon.get(`/createTask/tasksByStage/${teamName}/${stage}`);
    console.log(`Fetched ${stage} tasks:`, data);
    return data;
  };

  // Fetch tasks for each stage
  const { data: todoTasks = [] } = useQuery({
    queryKey: ["tasks", teamName, "todo"],
    queryFn: () => fetchTasksByStage("todo"),
    enabled: !!teamName,
  });

  const { data: inProgressTasks = [] } = useQuery({
    queryKey: ["tasks", teamName, "inProgress"],
    queryFn: () => fetchTasksByStage("in progress"),
    enabled: !!teamName,
  });

  const { data: completedTasks = [] } = useQuery({
    queryKey: ["tasks", teamName, "completed"],
    queryFn: () => fetchTasksByStage("done"),
    enabled: !!teamName,
  });

  // Update task lists when data changes
  useEffect(() => {
    setTaskLists({
      todo: todoTasks,
      inProgress: inProgressTasks,
      completed: completedTasks,
    });
  }, [todoTasks, inProgressTasks, completedTasks]);

  // Handle drag start
  const onDragStart = (e, id, stage) => {
    e.dataTransfer.setData("task", JSON.stringify({ id, stage }));
  };

  // Handle drag over
  const onDragOver = (e) => e.preventDefault();

  // Handle drop
  const onDrop = (e, targetStage) => {
    e.preventDefault();
    const { id, stage: currentStage } = JSON.parse(e.dataTransfer.getData("task"));

    if (currentStage !== targetStage) {
      const taskToMove = taskLists[currentStage].find((task) => task._id === id);
      setTaskLists((prev) => ({
        ...prev,
        [currentStage]: prev[currentStage].filter((task) => task._id !== id),
        [targetStage]: [...prev[targetStage], { ...taskToMove }],
      }));
    }
  };

  return (
    <div className="p-8 flex flex-col md:flex-row gap-4 justify-center">
      {["todo", "inProgress", "completed"].map((stage) => (
        <div
          key={stage}
          className="w-full md:w-1/3 bg-gray-200 p-4 rounded-lg border border-gray-400"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, stage)}
        >
          <h4 className="text-lg font-semibold text-gray-700 text-center mb-3 capitalize">
            {stage.replace(/([A-Z])/g, " $1")}
          </h4>
          <ul className="space-y-2">
            {taskLists[stage].map((task) => (
              <li
                key={task._id}
                draggable
                onDragStart={(e) => onDragStart(e, task._id, stage)}
                className="bg-white p-3 rounded-md shadow-md cursor-move"
              >
                {/* Display task name or other identifying property */}
                {task.taskTitle.slice(0, 50)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DragAndDropTaskManager;
