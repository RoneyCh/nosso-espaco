import { render } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/",
    };
  },
}));

describe("ActiveLink", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <ActiveLink href="/">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText("Home")).toBeInTheDocument();
  });

  it("active link receiving color purple.400", () => {
    const { getByText } = render(
      <ActiveLink href="/">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText("Home")).toHaveAttribute("color", "purple.400");
  });
});
