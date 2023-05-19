import "./DeleteModal.css";

export const DeleteModal = ({ handleModal, handleDelete }) => {
    //handle Delete and Model Unmount
    const handleDeleteButtonClick = () => {
        handleDelete();
        handleModal();
    };

    return (
        <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="button-container">
                <button
                    className="delete-button"
                    onClick={handleDeleteButtonClick}
                >
                    Yes
                </button>
                <button className="cancel-button" onClick={handleModal}>
                    No
                </button>
            </div>
        </div>
    );
};
