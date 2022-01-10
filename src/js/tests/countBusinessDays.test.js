import { countBusinessDays } from "../utils/countBusinessDays";

describe("countBusinessDays function", () => {
  it("should return '1' when given more than 24hs", () => {
    expect(countBusinessDays(new Date("2021-09-02T15:00:00Z"), new Date("2021-09-03T15:00:00Z"))).toBe(1);
  });

  it("should return '0' when given less than 24hs", () => {
    expect(countBusinessDays(new Date("2021-09-02T18:00:00Z"), new Date("2021-09-02T18:10:00Z"))).toBe(0);
  });

  it("should return '0' when starting on weekend and finishing on weekend", () => {
    expect(countBusinessDays(new Date("2021-01-15T18:00:00Z"), new Date("2021-01-16T18:10:00Z"))).toBe(0);
  });

  it("should return '0' when given less than 24hs because of a weekend", () => {
    expect(countBusinessDays(new Date("2022-01-07T23:00:00Z"), new Date("2022-01-08T23:00:00Z"))).toBe(0);
  });

  it("should return '5' when given an entire week", () => {
    expect(countBusinessDays(new Date("2022-01-07T23:00:00Z"), new Date("2022-01-14T23:00:00Z"))).toBe(5);
  });

  it("should return '10' when given two weeks", () => {
    expect(countBusinessDays(new Date("2022-01-07T23:00:00Z"), new Date("2022-01-21T23:00:00Z"))).toBe(10);
  });

  it("should return '21' when given dec 2021", () => {
    expect(countBusinessDays(new Date("2021-12-01T23:00:00Z"), new Date("2021-12-30T23:00:00Z"))).toBe(21);
  });
});
