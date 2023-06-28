import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Addition from "../../components/addition/Addition";

describe("Addition component tests", () => {
  it("renders without crashing", () => {
    render(<Addition />);
  });

  it("matches snapshot", () => {
    const addition = render(<Addition />).baseElement;

    expect(addition).toMatchSnapshot();
  });

  it("displays warning if one or both inputs are empty and non-zero", async () => {
    render(<Addition />);

    const addendInputs = await screen.findAllByDisplayValue("0");

    addendInputs.forEach((a) => fireEvent.change(a, { target: { value: "" } }));

    const warningMessage = await screen.findByText(
      "Please enter a value in both inputs."
    );
    expect(warningMessage).toBeInTheDocument();
  });

  it("displays correct sum with non-zero non-empty inputs", async () => {
    render(<Addition />);

    const addendInputs = await screen.findAllByDisplayValue("0");

    addendInputs.forEach((a) =>
      fireEvent.change(a, { target: { value: "5" } })
    );

    const sum = await screen.findByText("10");
    expect(sum).toBeInTheDocument();
  });
});
