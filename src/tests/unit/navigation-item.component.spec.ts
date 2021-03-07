import NavigationItemComponent from "@/components/NavigationItemComponent.vue";
import { mount } from "@vue/test-utils";

test("should render a navigation item", () => {
  // arrange
  const displayName = "xXstylerXx99";
  const wrapper = mount(NavigationItemComponent, {
    props: {
      displayName: displayName,
      iconName: "add.png"
    }
  });

  // act
  const result = wrapper.get('[data-test="displayName"]');

  // assert
  expect(result.text()).toBe(displayName);
});
