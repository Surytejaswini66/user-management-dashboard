// src/utils.js
export const splitName = (name) => {
  if (!name) return { firstName: "", lastName: "" };
  const [firstName, ...lastNameParts] = name.split(" ");
  return { firstName, lastName: lastNameParts.join(" ") };
};

export const validateUser = (user) => {
  const errors = {};
  if (!user.firstName) errors.firstName = "First name is required.";
  if (!user.lastName) errors.lastName = "Last name is required.";
  if (!user.email || !/\S+@\S+\.\S+/.test(user.email))
    errors.email = "Valid email is required.";
  if (!user.department) errors.department = "Department is required.";
  return errors;
};
