import React from 'react';
import {
    Modal, Button
} from 'react-bootstrap';

const ModalBookingDetail = ({
    show, handleHide, unit
}) => {

    const booking = unit.booking_data;

    return (
        <Modal
            show={show}
            onHide={handleHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal-container"
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Booking Detail of Unit &nbsp;
                    {booking.booking_id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ margin: '20px 0' }}>
                    <div className="row">
                        <div className="col-6">
                            Unit name : {unit.name}
                        </div>
                        <div className="col-6">
                            Customer name : {booking.customer_name}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            Booking Date : {booking.booking_date}
                        </div>
                        <div className="col-6">
                            Customer phone : {booking.customer_phone}
                        </div>
                    </div>
                </div>
                <Modal.Footer>
                    <Button className="modal-cancel-button" onClick={handleHide}>
                        Ok
                    </Button>
                </Modal.Footer>

            </Modal.Body>
        </Modal>
    );
};

export default ModalBookingDetail;
