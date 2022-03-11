import * as admin from "firebase-admin";

// jest.setTimeout(30000);

describe("abnLookupOnRequest", () => {
  beforeAll(() => {
    // COMMENT OUT THE NEXT 2 LINES TO MAKE THE 2nd TEST PASS
    jest.useFakeTimers();
    jest.setSystemTime(1349852318000);

    admin.initializeApp({
      projectId: "test-project",
      databaseURL: "http://localhost:9000?ns=test-project",
    });
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it("only passes with fake timers", () => {
    expect.assertions(1);

    expect(new Date().valueOf()).toBe(1349852318000);
  });
  it("hangs when fake timers are used", async () => {
    expect.assertions(1);

    try {
      const firestore = admin.firestore().doc("anything/really");
      const realtime = admin.database().ref("anyhting/really");
      console.log("this runs:", new Date().valueOf());
      // ----- EVERYTHING RUNS UP TO HERE -----

      // ----- any of the following commands will block when used with jest.useFakeTimers(); -----
      // await firestore.get();
      const ref = await realtime.once("value");
      const value = ref.val();
      console.log("this doesn't run:", value);

      expect(1).toBe(1);
    } catch (error) {
      console.log("THERE WAS AN ERROR:", error);
    }
  });
});
