import { Contact } from "../models/contacts.js";

export const listContacts = () => {
  return Contact.find({});
};

export const getContactById = (contactId) => {
  return Contact.findById(contactId);
};

export const removeContact = (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};

export const addContact = (data) => {
  return Contact.create(data);
};

export const updateContactById = (contactId, data) => {
  return Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
};

export const updateFavoriteStatus = (contactId, data) => {
  const status = { favorite: data };
  return Contact.findByIdAndUpdate(contactId, status, {
    new: true,
  });
};
