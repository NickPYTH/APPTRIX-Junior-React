export const Table = ({ usersList, openModalHandler }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">LOGIN</th>
                    <th scope="col">EMAIL</th>
                </tr>
            </thead>
            <tbody>
                {usersList.map((userInfo) => (
                    <tr
                        key={userInfo.id}
                        onClick={() => openModalHandler(userInfo)}
                    >
                        <th scope="row">{userInfo.id}</th>
                        <td>{userInfo.name ? userInfo.name : "-"}</td>
                        <td>{userInfo.login ? userInfo.login : "-"}</td>
                        <td>{userInfo.email ? userInfo.email : "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
