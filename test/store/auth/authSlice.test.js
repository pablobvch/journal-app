import {
  authSlice,
  checkingCredentials,
  login,
  logout
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState
} from "../../fixtures/authFixtures";

describe("authSlice tests", () => {
  test("should return the initial state calling it 'auth'", () => {
    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });
  test("should do authentication", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: "authenticated",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null
    });
  });
  test("should do logout without arguments", () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined
    });
  });
  test("should do logout and show an error message", () => {
    const errorMessage = "incorrect credentials";
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage
    });
  });
  test("should change the state to checking", () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe("checking");
  });
});
