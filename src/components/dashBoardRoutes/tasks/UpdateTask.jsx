
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import UseAxiosCommon from '@/hooks/UseAxiosCommon';
import { toast } from 'sonner';
import PageHeader from '@/components/pageHeader/PageHeader';
import { useSelector } from 'react-redux';

const UpdateTask = () => {
    const task = useLoaderData();
    const { user } = useSelector((state) => state.auth);
    // console.log("user", user); // Log user for debugging
    const { teamName } = task;
    // console.log('task',teamName)
    const navigate = useNavigate()
    const axiosCommon = UseAxiosCommon();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            taskTitle: task.taskTitle,
            stage: task.stage,
            assignedTo: task.assignedTo,
            priority: task.priority,
            // startDate: task.startDate,
            workerMail: task.workerMail,
        }
    });

    const onSubmit = async (data) => {

        try {
            // console.log(data);
            const response = await axiosCommon.patch(`/createTask/${task._id}`, data);
            // console.log(response.data);
            if (response.data.modifiedCount > 0) {
                toast.success('Data updated successfully');
            }
            const teamName = task.teamName;
            navigate(`/dashboard/teamTask/${teamName}`);
        } catch (error) {
            console.error("Error updating data:", error);
            toast.error('Failed to update data');
        }
    };

    return (
        <div className='my-auto mx-auto'>
            <PageHeader title='This is the updated page' breadcrumb='Please update what you want'></PageHeader>
            <section className=" mx-10 p-6 my-10 bg-white rounded-md shadow-md dark:bg-gray-800">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="taskTitle">Task name</label>
                            <input
                                id="taskTitle"
                                type="text"
                                {...register('taskTitle', { required: true })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                            {errors.taskTitle && <span className="text-red-500">Task name is required</span>}
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="stage">Stage</label>
                            <input
                                id="stage"
                                type="text"
                                {...register('stage', { required: true })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                            {errors.stage && <span className="text-red-500">stage is required</span>}
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="assignedTo">Task assigned to</label>
                            <input
                                id="assignedTo"
                                type="text"
                                {...register('assignedTo', { required: true })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                            {errors.assignedTo && <span className="text-red-500"> name is required</span>}
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="fees">Priority</label>
                            <input
                                id="priority"
                                type="text"
                                {...register('priority', { required: true })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                            {errors.fees && <span className="text-red-500">Priority are required</span>}
                        </div>
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="fees">Worker Email</label>
                            <input
                                id="workerMail"
                                type="text"
                                {...register('workerMail', { required: true })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                            {errors.workerMail && <span className="text-red-500">email are required</span>}
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default UpdateTask;
