import { whatIsTheMeaningOfLife } from "../src";

describe("meaning of life", () => {
  it("should be 33", () => {
    expect(whatIsTheMeaningOfLife()).toEqual(33);
  });
});
