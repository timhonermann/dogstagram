import CommentComponent from "@/components/CommentComponent.vue";
import { Comment } from "@/models";
import { mount } from "@vue/test-utils";

test("renders a comment", () => {
  // arrange
  const expectedComment = {
    userUid: "123",
    username: "Hans",
    comment: "This is a comment"
  } as Comment;
  const wrapper = mount(CommentComponent, {
    props: {
      comment: expectedComment
    }
  });

  // act
  const comment = wrapper.get('[data-test="comment"]');
  const username = wrapper.get('[data-test="username"]');

  // assert
  expect(comment.text()).toBe(expectedComment.comment);
  expect(username.text()).toBe(expectedComment.username + ":");
});
