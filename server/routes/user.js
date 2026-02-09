const { Router } = require("express")
const router = Router();
const { postUser, getUser, deleteUser, updateUser,getAllUsers } = require("../controller/user");

router.post("/user", postUser);
router.get("/users", getAllUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;


module.exports = router;