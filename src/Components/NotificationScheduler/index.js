import React from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSchedulerDetails from "../NotificationScheduler/NotificationSchedulerDetails";
import AddNotificationSchedule from "../NotificationScheduler/AddNotificationSchedule";
import UpdateNotificationSchedule from "../NotificationScheduler/UpdateNotificationSchedule";

export default function NotificationScheduler() {
    
    return (
        <Switch>
        <Route exact path='/notificationScheduler/notification-scheduler-details' component={NotificationSchedulerDetails} />
        <Route exact path='/notificationScheduler/notification-scheduler-details/add' component={AddNotificationSchedule} />
        <Route exact path='/notificationScheduler/notification-scheduler-details/edit' component={UpdateNotificationSchedule} />
        </Switch>
    );
  }

