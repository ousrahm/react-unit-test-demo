import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Countries, { CountryName } from "../../components/countries/Countries";
import { server } from "../../testServer";
import { rest } from "msw";

export const countryNames: CountryName[] = [
  { name: { common: "Italy" } },
  { name: { common: "San Marino" } },
  { name: { common: "Switzerland" } },
  { name: { common: "Vatican City" } },
];

describe("Countries component tests", () => {
  beforeAll(() => server.listen());
  //   beforeEach(() => jest.spyOn(global, "fetch").mockImplementation(jest.fn()));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders without crashing", () => {
    render(<Countries />);
  });

  it("matches snapshot", () => {
    const countries = render(<Countries />).baseElement;

    expect(countries).toMatchSnapshot();
  });

  it("displays italy when called w/ italian", async () => {
    server.use(
      rest.get("https://restcountries.com/v3.1/lang/italian", (req, res, ctx) =>
        res(ctx.status(200), ctx.json(countryNames))
      ),
      rest.get("https://restcountries.com/v3.1/lang/klingon", (req, res, ctx) =>
        res(ctx.status(400), ctx.json(countryNames))
      )
    );

    render(<Countries />);

    const languageInput = await screen.findByPlaceholderText("language here!");
    const searchButton = await screen.findByText("Search");

    fireEvent.change(languageInput, { target: { value: "italian" } });
    fireEvent.click(searchButton);

    const italy = await screen.findByText("Italy");
    const sanMarino = await screen.findByText("San Marino");
    const switzerland = await screen.findByText("Switzerland");
    const vaticanCity = await screen.findByText("Vatican City");

    expect(italy).toBeInTheDocument();
    expect(sanMarino).toBeInTheDocument();
    expect(switzerland).toBeInTheDocument();
    expect(vaticanCity).toBeInTheDocument();
  });

  it("displays the error message when called w/ klingon", async () => {
    server.use(
      rest.get("https://restcountries.com/v3.1/lang/klingon", (req, res, ctx) =>
        res(ctx.status(400), ctx.json("ERROR!"))
      )
    );

    render(<Countries />);

    const languageInput = await screen.findByPlaceholderText("language here!");
    const searchButton = await screen.findByText("Search");

    fireEvent.change(languageInput, { target: { value: "klingon" } });
    fireEvent.click(searchButton);

    const errorMessage = await screen.findByText(
      "Uh oh! There was an issue retrieving your data. Make sure you spelled it correctly."
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
