import { Input } from "./Input";
import { render, screen } from "@testing-library/react";

describe("Input", () => {
    it("should render correctly", () => {
        render(<Input name="usuario" label="Aniversário de namoro" />);
    
        expect(screen.getByLabelText('Aniversário de namoro')).toBeInTheDocument();

    });
    it("should render correctly", () => {
        render(<Input name="senha" label="O que eu mais gosto em você" />);
    
        expect(screen.getByLabelText('O que eu mais gosto em você')).toBeInTheDocument();

    });
    })