const { render, screen } = require("@testing-library/react");
const { AuthContext } = require("../../auth/context/AuthContext");
const { MemoryRouter } = require("react-router-dom");
const { AppRouter } = require("../../router/AppRouter");

describe('Pruebas en <AppRouter />', () => {
    test('debe de mostrar el login si no está autenticado', () => {
        const authContext = { logged: false };

        render(
            <AuthContext.Provider value={authContext}>
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        )
        
        // screen.debug();
        // Al haber múltiples, entonces toca usar getAllByText
        // expect(screen.getByText("Login")).toBeTruthy();

        expect(screen.getAllByText("Login").length).toBe(2);
    });

    test('debe de mostrar el componente de Marvel si está autenticado', () => {
        const authContext = {
            logged: true,
            user: {
                id: "ABC123",
                name: "Omar Stiven Rivera",
            }
        };

        render(
            <AuthContext.Provider value={authContext}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText("Marvel Comics")).toBeTruthy();
    });
});