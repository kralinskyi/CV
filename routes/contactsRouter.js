import express from "express";

import contactsControllers from "../controllers/contactsControllers.js";

import {
  createContactSchema,
  updateContactSchema,
  toggleFavoriteSchema,
} from "../schemas/contactsSchemas.js";

import validateBody from "../decorators/validateBody.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:contactId", isValidId, contactsControllers.getOneContact);

contactsRouter.delete(
  "/:contactId",
  isValidId,
  contactsControllers.deleteContact
);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:contactId",
  isValidId,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(toggleFavoriteSchema),
  contactsControllers.updateStatusContact
);

export default contactsRouter;
