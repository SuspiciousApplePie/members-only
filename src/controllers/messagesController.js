import {
  deleteMessageDB,
  getMessageById,
  getMessages,
  getUser,
  insertMessage,
} from "../db/query.js";
import { PageNotFound, NotAuthorized, BadRequest } from "../errors.js";
import { format } from "date-fns";
import { body, matchedData, validationResult } from "express-validator";

const VALID_ROLES = new Set(["Admin", "Member"]);
const ADMIN = "Admin";

const errorMessage = {
  TEXT_LIMIT: "Text message must be only 1-2000 characters",
  TITLE_LIMIT: "Text message must be only 1-255 characters",
};

const validateMessage = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(errorMessage.TITLE_LIMIT),
  body("new-message")
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage(errorMessage.TEXT_LIMIT),
];

async function displayMessages(req, res, next) {
  try {
    const messages = await getMessages();
    const user = await getUser();
    if (!user) throw new NotAuthorized("You are not a member of the club");
    const isMember = VALID_ROLES.has(user.role);
    const isAdmin = ADMIN === user.role;
    res.render("messages", { messages, user, isMember, isAdmin, format });
  } catch (e) {
    if (e instanceof BadRequest || e instanceof NotAuthorized) {
      return next(e);
    }
    next(new PageNotFound("Page not found"));
  }
}

async function displayMessageForm(req, res, next) {
  try {
    const user = await getUser();
    if (!user) throw new NotAuthorized("You are not a member of the club");
    const isMember = VALID_ROLES.has(user.role);
    if (!isMember) throw new NotAuthorized("You are not a member of the club");
    res.render("new-message", { user });
  } catch (e) {
    if (e instanceof BadRequest || e instanceof NotAuthorized) {
      return next(e);
    }
    next(new PageNotFound("Page not found"));
  }
}

const sendMessage = [
  validateMessage,
  async (req, res, next) => {
    try {
      const user = await getUser();
      if (!user) throw new NotAuthorized("You are not a member of the club");
      const isMember = VALID_ROLES.has(user.role);
      if (!isMember)
        throw new NotAuthorized("You are not a member of the club");
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render("new-message", { user, errors: errors.array() });
      }

      const { title, "new-message": newMessage } = matchedData(req);
      await insertMessage({ title, newMessage });
      res.redirect("/messages");
    } catch (e) {
      if (e instanceof BadRequest || e instanceof NotAuthorized) {
        return next(e);
      }
      next(new PageNotFound());
    }
  },
];

async function displayDeleteForm(req, res, next) {
  try {
    const user = await getUser();
    if (!user) throw new NotAuthorized("You are not member of the club");
    const isAdmin = ADMIN === user.role;
    if (!isAdmin) throw new NotAuthorized("You are not an admin of this club");
    const message = await getMessageById(req.params.msgId);
    if (!message) throw new BadRequest("Message does not exist");
    res.render("delete-msg", { message });
  } catch (e) {
    if (e instanceof BadRequest || e instanceof NotAuthorized) {
      return next(e);
    }
    next(new PageNotFound());
  }
}

async function deleteMessage(req, res, next) {
  try {
    const user = await getUser();
    if (!user) throw new NotAuthorized("You are not member of this club");
    const isAdmin = ADMIN === user.role;
    if (!isAdmin) throw new NotAuthorized("You are not an admin of this club");
    await deleteMessageDB(req.params.msgId);
    res.redirect("/messages");
  } catch (e) {
    if (e instanceof BadRequest || e instanceof NotAuthorized) {
      return next(e);
    }
    next(new PageNotFound());
  }
}

export {
  displayMessages,
  displayMessageForm,
  sendMessage,
  displayDeleteForm,
  deleteMessage,
};
