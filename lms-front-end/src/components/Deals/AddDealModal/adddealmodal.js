import React from 'react';
import './adddealmodal.css';


class AddDealModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button
          onClick={handleModalClose}
        >
          Cancel
        </button>
      </section>
    </div>
  );
};

export default AddDealModal;