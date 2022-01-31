import { Link } from "react-router-dom";

export const Table = ({ tasksList }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Summary</th>
                    <th scope="col">Project name</th>
                    <th scope="col">Work Item's</th>
                </tr>
            </thead>
            <tbody>
                {tasksList.map((taskInfo) => (
                    <tr key={taskInfo.id}>
                        <th scope="row">{taskInfo.id}</th>
                        <td>{taskInfo.summary ? taskInfo.summary : "-"}</td>
                        <td>
                            {taskInfo.project.name
                                ? taskInfo.project.name
                                : "-"}
                        </td>
                        <td>
                            <Link
                                className="btn btn-primary"
                                to={{
                                    pathname: `${taskInfo.id}`,
                                }}
                            >
                                Просмотреть
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
