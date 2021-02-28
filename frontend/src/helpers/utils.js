export const isUserLoggedIn = () =>
  localStorage.getItem("__token") && localStorage.getItem("__token").length > 10
    ? true
    : false;

export const logoutUser = () => localStorage.setItem("__token", "");

export class Action {
  constructor(actions) {
    this.actions = actions;
  }

  getRequest(_id) {
    const action = this.actions[_id] ? this.actions[_id] : null;
    if (action) {
      return action.req;
    }
    return null;
  }

  getResponse(_id) {
    const action = this.actions[_id] ? this.actions[_id] : null;
    if (action) {
      return action.res;
    }
    return null;
  }

  getResponseStatus(_id) {
    console.log("getResponseStatus", _id, this.actions);
    const action = this.actions[_id] ? this.actions[_id] : null;
    if (action) {
      return action.res?.status === true || action.res?.status === "success";
    }
    return null;
  }

  getResponseActionType(_id) {
    console.log("getResponseActionType", _id, this.actions);
    const action = this.actions[_id] ? this.actions[_id] : null;
    if (action) {
      return action.res?.type;
    }
    return null;
  }

  getResponseStatusType(_id) {
    const status = this.getResponseStatus(_id);
    const type = this.getResponseActionType(_id);
    return { status, type };
  }
}
