import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../heroes";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: ()=> mockedUseNavigate,
}));

describe('Prubas en <SearchPage />', () => {
    beforeEach(()=> jest.clearAllMocks());

    test('debe de mostrarse correctamente con valores por defecto', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        // Se usa toContain porque la ruta original contiene http://localhost...
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

        const alertDanger = screen.getByLabelText('alert-danger');
        expect(alertDanger.style.display).toBe('none');
    });

    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

        const alertDanger = screen.getByLabelText("alert-danger");
        expect(alertDanger.style.display).toBe('');

    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const inputText = screen.getByRole('textbox');
        fireEvent.change(inputText, {target: {name: 'searchText', value: "superman"}});

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman');
    });
});