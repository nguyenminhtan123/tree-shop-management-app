import login from './LoginRedux/reducer';
import app from './AppRedux/reducer';
import member from './MemberRedux/reducer';
import listCategory from './CategoryRedux/reducer';
import userProfile from './UserProfileRedux/reducer';
import orderHistory from './OrderHistoryRedux/reducer';
import addToCart from './CartRedux/reducer';
import product from './ProductRedux/reducer';
import notification from './NotificationRedux/reducer';

export default {
  login,
  app,
  member,
  listCategory,
  userProfile,
  orderHistory,
  addToCart,
  product,
  notification
};
