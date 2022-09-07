import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle
} from "../../../src/firebase/providers";
import {
  checkingAuthentication,
  checkingCredentials,
  login,
  logout,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout
} from "../../../src/store/auth";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe("thunk testing", () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks);

  test("should invoke the checkingCredentials", async () => {
    const returnedFunction = checkingAuthentication();
    await returnedFunction(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn should call checkingCredentials", async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSignIn should call checkingCredentials and logout with error", async () => {
    const loginData = { ok: false, errorMessage: "Google error" };
    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("should startLoginWithEmailPassword call login", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };
    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("should startLoginWithEmailPassword call login with error", async () => {
    const loginData = { ok: false, errorMessage: "Login error" };
    const formData = { email: demoUser.email, password: "123456" };
    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test("startCreatingUserWithEmailPassword sucessfull", async () => {
    const signUpData = { ok: true, ...demoUser };
    const formData = {
      email: demoUser.email,
      password: "pa$$word123",
      displayName: demoUser.displayName
    };
    await registerUserWithEmailPassword.mockResolvedValue(signUpData);
    await startCreatingUserWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(signUpData));
  });

  test("startCreatingUserWithEmailPassword with error", async () => {
    const signUpData = { ok: false, errorMessage: "Sign Up error" };
    const formData = {
      email: demoUser.email,
      password: "pa$$word123",
      displayName: demoUser.displayName
    };
    await registerUserWithEmailPassword.mockResolvedValue(signUpData);
    await startCreatingUserWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(signUpData.errorMessage));
  });

  test("startLogout should call  to logoutFirebase, clearNotes and logout", async () => {
    await startLogout()(dispatch);
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
