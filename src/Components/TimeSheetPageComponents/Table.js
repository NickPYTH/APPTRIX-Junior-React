import Pdf from "react-to-pdf";
import {createRef} from "react";

const ref = createRef();

export const Table = ({ workItemsList }) => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <table ref={ref} className="table table-striped w-75">
                <thead>
                <tr>
                    <th >User</th>
                    <th >Duration</th>
                </tr>
                </thead>
                <tbody>
                {workItemsList.map((workItem) => (
                    <tr key={workItem.id}>
                        <td>{workItem.author.name}</td>
                        <td>{workItem.duration.presentation}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center w-100">
                <Pdf targetRef={ref} filename="code-example.pdf">
                    {({ toPdf }) => <button className="btn btn-primary" onClick={toPdf}>Скачать Pdf</button>}
                </Pdf>
            </div>
        </div>

    );
};
