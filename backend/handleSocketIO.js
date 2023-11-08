const chatServices = require("./services/chatService");
const models = require("./models");
const jwt = require("jsonwebtoken");

function handleSocketIO(io) {
  const chatRooms = [];
  io.on("connection", async (socket) => {
    const user = await auth(socket);

    if (!user) {
      return socket.disconnect();
    }
    console.log("connected:", socket.id);

    // events
    socket.on("joinRoom", async (id) => {
      console.log("joining room id:", id);
      if (!chatRooms[id]) {
        chatRooms[id] = { participants: [] };
      }
      if (
        chatRooms[id].participants.find((usr) => usr.socket.id == socket.id)
      ) {
        console.log("duplicate join from socket rejected");
      } else chatRooms[id].participants.push({ socket, info: user });
      socket.emit("init", (await chatServices.getChat(id)).messages);
      // user.chatRooms.for
    });
    socket.on("sendMessage", async (data, cb) => {
      const { chatRoomId, text } = data;
      const chatRoom = chatRooms[chatRoomId];
      if (!chatRoom) {
        return;
      }
      const { participants } = chatRoom;
      const messageData = await chatServices.createMessage({
        conversation: chatRoomId,
        sender: user._id,
        text: text,
      });
      console.log(
        "message",
        data.text,
        "sent to %s participants",
        participants.length
      );
      const promises = participants.map((participant) => {
        const { socket } = participant;
        return new Promise((resolve) => {
          socket.emit("receiveMessage", { ...messageData, sender: user });
          resolve();
        });
      });
      await Promise.all(promises);
      cb({
        status: "ok",
      });
    });
    socket.on("disconnect", () => {
      console.log("disconnected:", socket.id);
    });
  });
}
async function auth(socket) {
  const headers = socket.handshake.headers;
  if (!headers.authorization) {
    console.log("No authorization header");
    return null;
  }
  const jwt = headers.authorization.split(" ")[1] || "";
  const user = await verifyTokenAsync(jwt, "jwtSecret");
  if (!user) console.log("Invalid JWT", headers.authorization);
  return user;
}
const verifyTokenAsync = async (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await models.User.findOne({ email: decoded.email });
    return user || null; // Return null if user is not found
  } catch (e) {
    console.log(e);
    return null;
  }
};
module.exports = {
  handleSocketIO,
};
