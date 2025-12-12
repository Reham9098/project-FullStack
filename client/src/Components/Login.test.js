import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Login Component", () => {
  let store;
  const onCloseMock = jest.fn();

  beforeEach(() => {
    store = mockStore({
      users: { msg: null }
    });
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login isOpen={true} onClose={onCloseMock} />
        </BrowserRouter>
      </Provider>
    );

  it("renders logo, inputs, and button", () => {
    renderComponent();

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows validation errors when inputs are empty", async () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it("calls onClose and dispatch login on successful submit", async () => {
    store.dispatch = jest.fn(() => Promise.resolve({ type: "users/login/fulfilled" }));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Enter your email..."), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password..."), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: { email: "test@example.com", password: "123456" }
      })
    );

    
    setTimeout(() => {
      expect(onCloseMock).toHaveBeenCalled();
    }, 0);
  });
});
