function lowerCaseExceptPassword(params) {
  let updatedParams = {};

  for (let key in params) {
    if (key !== "password" && typeof params[key] === "string") {
      updatedParams[key] = params[key].toLowerCase();
    } else {
      updatedParams[key] = params[key];
    }
  }
  return updatedParams;
}

export default lowerCaseExceptPassword;
