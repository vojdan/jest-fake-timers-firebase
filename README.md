# Using jest.useFakeTimers() hangs firebase + jest

Repro test is `functions/src/fakeTimers.test.ts`

To run the tests you need to:

- execute `npm run emulators` in one terminal
- execute `npm test` in another terminal

Removing the following lines will allow the tests to pass, but we want to `useFakeTimers` to make test that depend on dates and timers be stable.

```
jest.useFakeTimers();
jest.setSystemTime(1349852318000);
```
