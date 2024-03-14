import { authReducer } from "../../../auth";
import { types } from "../../../auth/types/types";

describe("Pruebas en authReducer", () => {
    test('debe de retornar el estado por defecto', () => {
        const state = authReducer({ logged: false }, {});

        expect(state).toEqual({ logged: false });
    });

    test('debe de (login) llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: {
                id: "ABC",
                name: "Omar Stiven",
            }
        }

        const state = authReducer({logged: false}, action);

        expect(state).toEqual({
            logged: true,
            user: action.payload,
        });
    });

    test('debe de (logout) borrar el name del usuario y logged en false', () => {
        const state = {
            logged: true,
            user: {id: "123", name: "Omar Stiven"}
        };

        const newState = authReducer(state, {type: types.logout});

        expect(newState).toEqual({logged: false});
    });
});