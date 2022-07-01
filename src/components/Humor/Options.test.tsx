import { render, screen} from "@testing-library/react";
import { FormEvent, SetStateAction } from "react";
import { Options } from "./Options";

const handleSubmit = jest.fn((e: FormEvent<Element>): Promise<void> => {
    e.preventDefault();
    return Promise.resolve();
});
const setTitle = jest.fn((e:SetStateAction<string>) => e);



describe("Options", () => {
    it("renders correctly", () => {
        render(<Options handleSubmit={handleSubmit} setTitle={setTitle}/>);
    
        expect(screen.getByText("Feliz")).toBeInTheDocument();
    });
})