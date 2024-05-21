import { Contact } from "../models/contact.js";

export const listContacts = async (filter = {}) => {
  return Contact.find(filter).populate("owner", "email subscription");
};

export const getContactById = async (filters) => {
  return Contact.findOne(filters);
};

export const removeContact = async (filters) => {
  return Contact.findOneAndDelete(filters);
};

export const addContact = async (data) => {
  return Contact.create(data);
};

export const updateContactById = async (filters, data) => {
  return Contact.findOneAndUpdate(filters, data, {
    returnDocument: "after",
  });
};

export const updateFavoriteStatus = async (filters, data) => {
  const status = { favorite: data };
  return Contact.findOneAndUpdate(filters, status, {
    new: true,
  });
};
