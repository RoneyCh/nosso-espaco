import { render, screen } from "@testing-library/react";
import Modal from ".";


describe("Modal", () => {
  it("should render correctly", () => {
    render(<Modal url=""/>);

    expect(screen.getByAltText('nos')).toBeInTheDocument();
  });
})


