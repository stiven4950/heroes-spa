import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../auth";
import { PrivateRoute } from "../../router/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe('Prubas en el <PrivateRoute />', () => {
    test('debe de mostrar el children si está autenticado', () => {
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: "ABC123",
                name: "Juan Carlos",
            }
        };
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        
        expect(screen.getByText("Ruta privada")).toBeTruthy();
        // Se le pueden pasar dos parámetros porque el setItem ese número de parámetros recibe
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', 'search?q=batman');
    });
});