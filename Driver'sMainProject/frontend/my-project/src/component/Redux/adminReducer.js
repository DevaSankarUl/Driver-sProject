import { createSlice } from '@reduxjs/toolkit';
//state created
const INITIAL_STATE = {
  userDetails: '',
  expertDetails: '',
  adminDetails: '',
  userAllDetails: '',
  userToken: '',
  DriverToken: '',
  userpickAndDropDetails: '',
}

//slice created
const loginSlice = createSlice({
  //named
  name: 'logindetails',
  initialState: INITIAL_STATE,
  //inside reducers methods or actions created
  reducers: {
    userLoginDetails: (state, action) => {
      let { userDetails } = state;
      userDetails = action.payload;
      return { ...state, userDetails };
    },
    categoryDetails: (state, action) => {
      let { category } = state;
      category = action.payload;
      return { ...state, category }
    },
    expertDetails: (state, action) => {
      let { expertDetails } = state;
      expertDetails = action.payload;
      return { ...state, expertDetails };
    },
    adminLoginDetails: (state, action) => {
      let { adminDetails } = state;
      adminDetails = action.payload;
      return { ...state, adminDetails };
    },
    clearUserLoginDetails: (state, action) => {
      let { userDetails } = state;
      userDetails = false;
      return { ...state, userDetails };
    },
    clearExpertLoginDetails: (state, action) => {
      let { expertDetails } = state;
      expertDetails = false;
      return { ...state, expertDetails };
    },
    clearAdminLoginDetails: (state, action) => {
      let { adminDetails } = state;
      adminDetails = false;
      return { ...state, adminDetails };
    },
   
    userpickAndDropDetails: (state, action) => {
      let { userpickAndDropDetails } = state;
      userpickAndDropDetails = action.payload;
      return { ...state, userpickAndDropDetails }
    },
    
    userToken: (state, action) => {
      let { userToken } = state;
      userToken = action.payload
      return { ...state, userToken }
    },
    admintoken: (state, action) => {
      let { admintoken } = state;
      admintoken = action.payload
      return { ...state, admintoken }
    },
    clearadminToken: (state, action) => {
      let { admintoken } = state
      admintoken = false
      return { ...state, admintoken }
    },
    DriverToken: (state, action) => {
      let { DriverToken } = state;
      DriverToken = action.payload
      return { ...state, DriverToken }
    },
    clearDriverToken: (state, action) => {
      let { DriverToken } = state
      DriverToken = false
      return { ...state, DriverToken }
    },
    clearUserToken: (state, action) => {
      let { userToken } = state;
      userToken = false;
      return { ...state, userToken }
    },
  bookingDetials:(state,action)=>{
    let {booking} =state;
    booking = action.payload
    return {...state,booking}
  },
      clearbookingDetails: (state, action) => {
      let { booking } = state;
      booking = false;
      return { ...state, booking }
    },
  },
});

// this is for dispatch
export const {
  userLoginDetails,
  expertLoginDetails,
  adminLoginDetails,
  clearUserLoginDetails,
  expertDetails,
  clearExpertLoginDetails,
  clearAdminLoginDetails,
  userAllDetails,
  clearUserAllDetails,
  userToken,
  clearUserToken,
  categoryDetails,
  DriverToken,
  admintoken,
  clearadminToken,
  userpickAndDropDetails,
  bookingDetials,
  clearbookingDetails,
} = loginSlice.actions;

// this is for configureStore
export default loginSlice.reducer;