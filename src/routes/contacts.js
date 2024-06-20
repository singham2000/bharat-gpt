const express = require("express");
const router = express.Router();

const {
  addContacts,
  getContacts,
  deleteContact,
  updateContacts,
} = require("../controllers/contactsController");

router
  .route("/contacts")
  .post(addContacts)
  .get(getContacts)
  .delete(deleteContact)
  .put(updateContacts);

module.exports = router;
