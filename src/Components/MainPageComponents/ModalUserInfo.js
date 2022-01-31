export const ModalUserInfo = ({ setModalIsVisible, userInfo }) => {
    return (
        <div className="position-absolute w-100">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{userInfo.name}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setModalIsVisible(false)}
                        />
                    </div>
                    <div className="modal-body">
                        <p>
                            Id <b>{userInfo.id}</b>
                        </p>
                        <p>
                            Type <b>{userInfo.$type}</b>
                        </p>
                        <p>
                            Email{" "}
                            <b>
                                {userInfo.email
                                    ? userInfo.email
                                    : "Отсутствует"}
                            </b>
                        </p>
                        <p>
                            Login <b>{userInfo.login}</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
