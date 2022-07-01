import { render, screen } from "@testing-library/react";
import { Profile } from "./Profile";


describe("Profile", () => {
    it("renders change picture when click on the picture", () => {
        render(<Profile showProfileData={true}/>);


        expect(screen.getByText("Alterar Foto")).toBeInTheDocument();
    });
    it("renders the username correctly", () => {
        render(<Profile />);


        expect(screen.getByText("Nós")).toBeInTheDocument();
    });
    });


