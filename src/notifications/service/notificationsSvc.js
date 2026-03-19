const Notification = require("../models/Notifications");
const { createError } = require('../../utils/handleErrors');

// user's nptifications bell
const getNotifications = async (userId) => {
    const notifications = await Notification.find({toUser: userId});
    if(!notifications) throw createError(404, "Notifications not found")
    return notifications;
}

// Mark as read notification
const markAsRead = async (userId) => {
    let notifications = await Notification.updateMany(
        {toUser: userId},
        {$set: {isRead: true}}
    );
    return notifications;
} 

// Delete notification
const deleteNotification = async (notificationId) => {
    const notification = await Notification.findByIdAndDelete(notificationId)
    if(!notification) throw createError(404, "Notifications not found")
    return notification;
}

module.exports = {getNotifications, markAsRead, deleteNotification}