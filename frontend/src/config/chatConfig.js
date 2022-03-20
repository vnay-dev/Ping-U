export const getSender = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id ? users[1].name : users[0].name;
};

export const getFullSenderData = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id ? users[1] : users[0];
};
