import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../auth/context/AuthContext";
import { PublicRoute } from "../../router/PublicRoute";
import { MemoryRouter, Routes, Route } from "react-router-dom";


describe('Pruebas en <PublicRoute />', () => {
    test('debe de mostrar el chlidren si no está autenticado', () => {
        const contextValue = {
            logged: false
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        // screen.debug(); ayuda a visualizar los resultados en la consola de la estructura HTML

        expect(screen.getByText("Ruta pública")).toBeTruthy();
    });

    test('debe de navegar si está autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                name: "Strider",
                id: "ABC123"
            }
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        }/>

                        <Route path="marvel" element={<h1>Página Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        // screen.debug();

        expect(screen.getByText("Página Marvel")).toBeTruthy();
    });
});