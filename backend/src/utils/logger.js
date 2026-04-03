import Activity from '../models/Activity.js';

export const logActivity = async (req, action, details, targetUser = 'Self') => {
    try {
        await Activity.create({
            user: req.user.id,
            action,
            details,
            targetUser,
            ipAddress: req.ip
        });
    } catch (error) {
        console.error("Activity Logging Failed:", error);
    }
};