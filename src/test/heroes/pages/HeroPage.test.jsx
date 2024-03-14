import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HeroPage } from "../../../heroes/pages";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en <HeroPage />", () => {
    test('debe de mostrarse correctamente', () => {
        const { container } = render(
            <MemoryRouter initialEntries={[`/hero/dc-green`]}>
                <Routes>
                    <Route path="hero/:id" element={<HeroPage />} />
                </Routes>
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot();

        const image = screen.getByRole("img");
        expect(image.src).toContain('/assets/heroes/dc-green.jpg');
        expect(image.alt).toBe('Green Lantern');
    });

    test('debe navegar a la pagina de marvel si el heroe no existe', () => {
        render(
            <MemoryRouter initialEntries={[`/hero/dc-no-exists`]}>
                <Routes>
                    <Route path="hero/:id" element={<HeroPage />} />
                    <Route path="marvel" element={<h1>Página Marvel</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByText("Página Marvel")).toBeTruthy();
    });

    test('debe de navegar a la pantalla anterior', () => {
        render(
            <MemoryRouter initialEntries={['/hero/dc-green']}>
                <Routes>
                    <Route path="hero/:id" element={<HeroPage />} />
                </Routes>
            </MemoryRouter>
        )

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
    });
});