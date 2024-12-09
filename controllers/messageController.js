const Message = require('../models/Chat');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.id; // Assuming you have authentication middleware

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content
    });

    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id; // Assuming you have authentication middleware

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversation', error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    await Message.findByIdAndUpdate(messageId, { read: true });

    res.status(200).json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking message as read', error: error.message });
  }
};

