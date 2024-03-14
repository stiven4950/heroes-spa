import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../auth";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../../../ui";

// Probar funciones que son llamadas en componentes
const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: ()=> mockedUseNavigate,
}));

describe('Pruebas en <Navbar/>', () => {
    const authContext = {
        logged: true,
        user: {
            id: "ABC123",
            name: "Omar Stiven",
        },
        logout: jest.fn(),
   };

   beforeEach(()=> jest.clearAllMocks());

    test('debe de mostrar el nombre del usuario logueado', () => {
       
       render(
            <AuthContext.Provider value={authContext}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
       );
       expect(screen.getByText(authContext.user.name)).toBeTruthy();
    });

    test('debe de llamar el logout y navigate cuando se hace click en el botón', () => {
        render(
            <AuthContext.Provider value={authContext}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
       );
       
       const logoutBtn = screen.getByRole('button');
       fireEvent.click(logoutBtn);

       expect(authContext.logout).toHaveBeenCalled();
       expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {replace: true});
    });
});