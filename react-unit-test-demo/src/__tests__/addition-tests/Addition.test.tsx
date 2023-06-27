import { render } from "@testing-library/react";
import Addition from "../../components/addition/Addition";

describe("Addition component tests", () => {
  it("renders without crashing", () => {
    render(<Addition />);
  });

  it("matches snapshot", () => {
    const addition = render(<Addition />).asFragment;

    expect(addition).toMatchSnapshot();
  });
});
