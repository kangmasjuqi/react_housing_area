// #####################
// uncomment for real API call
// import api from '../bridge';

import {
    CREATEBOOKING, ERRORS
} from './unit.types';

export const createNewBooking = (payload) => async (dispatch) => {
    dispatch({
        type: CREATEBOOKING
    });
    try {
        console.log('Step 2 - Lets call API')
        console.log(payload)

        // #####################
        // for demo only
        const res = {
            status: 200,
            data: {
                booking_id: 'BBB-999000',
                customer_name: 'Marjuqi R.',
                customer_phone: '0812-7777-0000',
                booking_date: '2021-07-07'
            }
        };
        // #####################
        // for real API call
        // const res = await api.post(`/api-booking-here`, payload);
        // if (res.status === 200) {
        //     dispatch({
        //         type: CREATEBOOKING
        //     });
        // }
        return res;
    } catch (e) {
        dispatch({
            type: ERRORS,
            payload: payload
        });
        return e.response;
    }
};