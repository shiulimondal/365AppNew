import { combineReducers } from "redux";
import User from './User';
import Payment from './paymentSlice';
import UserId from './SearchId';

export default combineReducers({
    User,
    Payment,
    UserId
});

