// src/utils/validation.js

/**
 * Splits a full name into first and last names.
 * @param {string} name - Full name of the user.
 * @returns {Object} - An object containing firstName and lastName.
 */
export const splitName = (name) => {
  if (!name) return { firstName: "", lastName: "" };
  const [firstName, ...lastNameParts] = name.split(" ");
  return { firstName, lastName: lastNameParts.join(" ") };
};

/**
 * Validates the user data.
 * @param {Object} user - The user object to validate.
 * @returns {Object} - An object containing validation error messages.
 */
export const validateUser = (user) => {
  const errors = {};
  if (!user.firstName) errors.firstName = "First name is required.";
  if (!user.lastName) errors.lastName = "Last name is required.";
  if (!user.email || !/\S+@\S+\.\S+/.test(user.email))
    errors.email = "Valid email is required.";
  if (!user.department) errors.department = "Department is required.";
  return errors;
};
