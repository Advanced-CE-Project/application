import * as attendance from './attendance';
import * as auth from './auth';
import * as clubs from './clubs';
import * as locations from './locations';
import * as meetings from './meetings';
import * as notifications from './notifications';
import * as ratings from './ratings';
import * as users from './users';

const services = {
  auth,
  clubs,
  ratings,
  users,
  attendance,
  locations,
  notifications,
  meetings,
};
export default services;
