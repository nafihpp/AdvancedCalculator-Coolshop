import "./Modal.css";

export const Modal = ({ children, handleModal }) => {
    return (
        <div className="modal">
            <div className="modal-overlay" onClick={handleModal}></div>
            {children}
        </div>
    );
};
