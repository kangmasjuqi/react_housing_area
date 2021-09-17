import React, { useState } from 'react';
import {
    Col, Form, Modal, Button
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { TENORS, GIFT_OPTIONS } from './dummy-data';

const validationSchema = yup.object().shape({
    unit_name: yup.string().required(),
    customer_name: yup.string().required(),
    customer_phone: yup.string().required(),
    booking_detail: yup.string().required(),
    payment_type: yup.string().required()
});

const ModalCreateBooking = ({
    show, handleHide, handleOnSubmit, unit, isLoading
}) => {
    const [paymentType, setPaymentType] = useState('');
    const [isNewCustomer, setIsNewCustomer] = useState(true);
    const [selectedGifts, setSelectedGifts] = useState([]);

    const handleSubmitBooking = (value) => {
        const paramsObj = {
            unit_name: value.unit_name,
            customer_name: value.customer_name,
            customer_phone: value.customer_phone,
            booking_detail: value.booking_detail,
            payment_type: paymentType,
            tenor: parseInt(value.tenor, 10),
            gifts: selectedGifts,
            is_new_customer: isNewCustomer ? 1 : 0
        };
        handleOnSubmit(paramsObj);
    };

    const handlePaymentType = (event) => {
        setPaymentType(event.target.value);
    };

    const checkIfGiftSelected = (giftName) => selectedGifts.includes(giftName);

    const handlePickGift = (e, giftName) => {
        if (checkIfGiftSelected(giftName) !== true) {
            selectedGifts.push(giftName);
        } else {
            const index = selectedGifts.indexOf(giftName);
            if (index !== -1) {
                selectedGifts.splice(index, 1);
            }
        }
        setSelectedGifts(selectedGifts);
    };

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
                    Book Unit&nbsp;
                    {unit.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitBooking}
                    initialValues={{
                        unit_name: unit ? unit.name : '',
                        customer_name: '',
                        customer_phone: '',
                        booking_detail: '',
                        payment_type: '',
                        tenor: 0
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>

                            <div className="row">
                                <div className="col-6">
                                    <Form.Group as={Col} controlId="unit_name">
                                        <Form.Label>Unit name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="unit_name"
                                            value={values.unit_name}
                                            isInvalid={!!touched.unit_name && !!errors.unit_name}
                                            onChange={handleChange}
                                            readOnly
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.unit_name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-6">

                                    <Form.Group as={Col} controlId="booking_detail">
                                        <Form.Label>Booking detail *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="booking_detail"
                                            value={values.booking_detail}
                                            isInvalid={!!touched.booking_detail && !!errors.booking_detail}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.booking_detail}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Form.Group as={Col} controlId="customer_name">
                                        <Form.Label>Customer Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="customer_name"
                                            value={values.customer_name}
                                            isInvalid={!!touched.customer_name && !!errors.customer_name}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.customer_name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group as={Col} controlId="customer_phone">
                                        <Form.Label>Customer Phone *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="customer_phone"
                                            value={values.customer_phone}
                                            isInvalid={!!touched.customer_phone && !!errors.customer_phone}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.customer_phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Form.Group as={Col} controlId="radio-payment-type-cash">
                                        <Form.Label>Payment Type *</Form.Label>
                                        <Form.Check
                                            id="radio-payment-type-cash"
                                            type="radio"
                                            label="CASH"
                                            name="payment_type"
                                            onChange={(e) => {
                                                handlePaymentType(e);
                                                handleChange(e);
                                            }}
                                            value="cash"
                                        />
                                        <Form.Check
                                            id="radio-payment-type-credit"
                                            type="radio"
                                            label="KREDIT NON RIBA"
                                            name="payment_type"
                                            onChange={(e) => {
                                                handlePaymentType(e);
                                                handleChange(e);
                                            }}
                                            value="kredit_non_riba"
                                        />
                                    </Form.Group>
                                    {
                                        paymentType === 'kredit_non_riba' ? (
                                            <Form.Group as={Col} controlId="tenor">
                                                <Form.Label>Tenor</Form.Label>
                                                <Form.Control
                                                    name="tenor"
                                                    as="select"
                                                    value={values.tenor}
                                                    onChange={handleChange}
                                                    isInvalid={!!touched.tenor && !!errors.tenor}
                                                >
                                                    {
                                                        TENORS.map((value) => (
                                                            <option key={value.id} value={value.id}>
                                                                {value.name}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.jobId}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        ) : ''
                                    }
                                </div>
                                <div className="col-6">
                                    <Form.Group as={Col} className="cb-isNewCustomer">
                                        <Form.Check
                                            name="isNewCustomer"
                                            label="New Customer ? "
                                            onChange={() => setIsNewCustomer(!isNewCustomer)}
                                            id="login-form-remember-me"
                                            defaultChecked={isNewCustomer}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-12" style={{margin: '20px 0'}}>
                                    <div className="row">
                                        <Form.Label>Free Gift(s)</Form.Label>
                                        {
                                            GIFT_OPTIONS.map((gift) => {
                                                return (
                                                    <div
                                                        className={`col-4 cb-${gift.field}`}
                                                        key={gift.field}
                                                    >
                                                        <Form.Check
                                                            name={gift.field}
                                                            label={`${gift.no}. ${gift.label}`}
                                                            onChange={(e) => handlePickGift(e, gift.field)}
                                                            id={gift.field}
                                                        />
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <Modal.Footer>
                                <Button className="modal-cancel-button" onClick={handleHide}>
                                    Cancel
                                </Button>
                                <Button
                                    className="modal-proceed-button"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving..' : 'Book!'}
                                </Button>
                            </Modal.Footer>

                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default ModalCreateBooking;
