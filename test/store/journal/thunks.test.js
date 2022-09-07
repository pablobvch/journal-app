import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote
} from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

jest.setTimeout(10000);

describe("journal thunks testing", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const getState = jest.fn();

  test("startNewNote should create a new blank note", async () => {
    const uid = "TEST-UID";
    getState.mockReturnValue({ auth: { uid } });

    await startNewNote()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: expect.any(Array)
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: expect.any(Array)
      })
    );

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
    await Promise.all(deletePromises);
  });
});
