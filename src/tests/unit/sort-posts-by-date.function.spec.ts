import { sortPostsByPostedAtDate } from "../../functions/sort-posts-by-date.function";
import { Post } from "@/models";

describe("sortPostsByPostedAtDate", () => {
  it("should return sorted array of Posts by newest posted at date", () => {
    // arrange
    const post1 = {
      postedAt: new Date(2021, 3, 5, 15, 13, 12, 1)
    } as Post;

    const post2 = {
      postedAt: new Date(2020, 3, 5, 15, 13, 12, 1)
    } as Post;

    const post3 = {
      postedAt: new Date(2021, 3, 5, 14, 13, 12, 1)
    } as Post;

    const sortedArray = [post1, post3, post2];

    // act
    const result = sortPostsByPostedAtDate([post1, post2, post3]);

    // assert
    expect(result).toEqual(sortedArray);
  });
});
