import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Container, Row
} from 'react-bootstrap';

import {
    Stage, Layer, Rect, Text
} from 'react-konva';

import ModalCreateBooking from './ModalCreateBooking';
import ModalBookingDetail from './ModalBookingDetail';
import { DUMMY_DATA } from './dummy-data';

import { createNewBooking } from '../redux/unit/unit.action';

const ColoredRect = ({
    name, x, y, width, height, color, handleSetModal,
    setSelectedUnit, unit, setIsBooked
}) => {
    const handleClick = () => {
        console.log(`Step 1 - Unit ${name} clicked`);
        setSelectedUnit(unit);
        handleSetModal(true);
        setIsBooked(false);
    };

    return (
        <>
            <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={color}
                shadowBlur={2}
                onClick={handleClick}
            />
            <Text
                x={x}
                y={y}
                width={width - 2}
                height={height - 2}
                text={unit.name}
                fill="black"
                fontSize={12}
                verticalAlign="middle"
                align="center"
                onClick={handleClick}
                wrap="char"
                padding={0.1}
            />
        </>
    );
};

const Unit = () => {
    const dispatch = useDispatch();
    const defaultUnitColor = '#eeeeff';
    const bookedUnitColor = '#cdabfe';

    const [modalCreate, setModalCreate] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [isBooked, setIsBooked] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const hideCreateModal = () => {
        setModalCreate(false);
        setIsLoading(false);
    };

    const hideDetailModal = () => {
        setModalDetail(false);
        setIsLoading(false);
    };

    const createBookingDispatch = (formData) => {
        setIsLoading(true);
        setModalCreate(false);
        dispatch(createNewBooking(formData)).then((res) => {
            setIsLoading(false);
            if (res.status === 200) {
                setModalCreate(false);
                console.log('Step 3 - Print data from API response')
                console.log(res.data)
            }
        });
        setIsBooked(true);
    };

    return (
        <Container fluid>
            <div>
                <Row className="title-container">
                    <span className="title-label">
                        RND Unit Perumahan
                    </span>
                </Row>

                <Row className="content-container">
                    <div>
                        <Stage width={window.innerWidth} height={window.innerHeight}>
                            <Layer>
                                {
                                    DUMMY_DATA.map((unit) => {
                                        let color = defaultUnitColor;
                                        if (selectedUnit !== null && isBooked === true) {
                                            if (selectedUnit.name === unit.name) {
                                                color = bookedUnitColor;
                                            }
                                        }
                                        if(unit.hasOwnProperty('booking_data')){
                                            color = bookedUnitColor;
                                        }
                                        return (
                                            <ColoredRect
                                                key={unit.name}
                                                name={unit.name}
                                                x={unit.x}
                                                y={unit.y}
                                                width={unit.width}
                                                height={unit.height}
                                                color={color}
                                                handleSetModal={
                                                    unit.hasOwnProperty('booking_data')? 
                                                        setModalDetail: setModalCreate
                                                }
                                                setSelectedUnit={setSelectedUnit}
                                                unit={unit}
                                                setIsBooked={setIsBooked}
                                            />
                                        );
                                    })
                                }
                            </Layer>
                        </Stage>
                        {
                            modalCreate && (
                                <Row>
                                    <ModalCreateBooking
                                        show={modalCreate}
                                        handleHide={hideCreateModal}
                                        handleOnSubmit={createBookingDispatch}
                                        unit={selectedUnit}
                                        isLoading={isLoading}
                                    />
                                </Row>
                            )
                        }
                        {
                            modalDetail && (
                                <Row>
                                    <ModalBookingDetail
                                        show={modalDetail}
                                        handleHide={hideDetailModal}
                                        unit={selectedUnit}
                                    />
                                </Row>
                            )
                        }
                    </div>
                </Row>
            </div>
        </Container>
    );
};

export default Unit;
