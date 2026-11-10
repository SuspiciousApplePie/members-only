import { getMessages, getUser } from "../db/query.js";
import { PageNotFound } from "../errors.js";
import { format } from "date-fns";

const VALID_ROLES = new Set(["Admin", "Member"]);
const ADMIN = "Admin";

async function displayMessages(req, res, next) {
  try {
    const messages = await getMessages();
    const user = await getUser();
    const isMember = VALID_ROLES.has(user.role);
    const isAdmin = ADMIN === user.role;
    res.render("messages", { messages, user, isMember, isAdmin, format });
  } catch {
    next(new PageNotFound("Page not found"));
  }
}

export { displayMessages };
