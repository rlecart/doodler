const move = (dir, idRoom, socket) => {
  return (new Promise((res, rej) => {
    if (socket && socket.connected && socket.id)
      socket.emit('move', socket.id, idRoom, dir, (reponse) => {
        if (reponse && reponse.type === 'ok')
          res();
        else
          rej(reponse.value);
      });
    else
      rej('socket not connected');
  }));
};

export default {
  move,
};