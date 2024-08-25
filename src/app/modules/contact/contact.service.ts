import QueryBuilder from "../../builder/QueryBuilder";
import { TContact } from "./contact.interface";
import { Contact } from "./contact.model";

const createContactMessageInDB = async (payload: TContact) => {
  const result = await Contact.create(payload);
  return result;
};

const getAllContactMessageFromDB = async (query: Record<string, unknown>) => {
  const contactQuery = new QueryBuilder(Contact.find(), query)
    .search(["email", "phone"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await contactQuery.modelQuery;
  const meta = await contactQuery.countTotal();

  return {
    result,
    meta,
  };
};

export { createContactMessageInDB, getAllContactMessageFromDB };
