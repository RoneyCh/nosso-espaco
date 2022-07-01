import { render, screen } from "@testing-library/react";
import { Profile } from "./Profile";


describe("Profile", () => {
    it("renders correctly", () => {
        render(<Profile showProfileData={true}/>);


        expect(screen.getByText("Alterar Foto")).toBeInTheDocument();
    });
    });


