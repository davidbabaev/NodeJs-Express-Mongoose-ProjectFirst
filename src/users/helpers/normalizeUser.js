
const normalizeUser = (user) => {
    return{
        ...user,
        profilePicture: user.profilePicture || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
    }
} 

module.exports = normalizeUser;