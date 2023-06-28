import React from "react";
import styles from "./Countries.module.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export interface CountryName {
  name: {
    common: string;
  };
}

const Countries = (): JSX.Element => {
  const [names, setNames] = React.useState<string[]>([]);
  const [language, setLanguage] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSearch = React.useCallback(async (lang: string) => {
    try {
      await fetch(
        `https://restcountries.com/v3.1/lang/${lang.trim()}?fields=name`
      ).then(async (response) => {
        setError("");
        const countries: CountryName[] = await response.json();

        const countryNames: string[] = countries.map((c) => c.name.common);

        setNames(countryNames);
      });
    } catch {
      setNames([]);
      setError(
        "Uh oh! There was an issue retrieving your data. Make sure you spelled it correctly."
      );
    }
  }, []);

  return (
    <div className="Countries">
      <h2 className={styles.heading}>Countries By Language</h2>
      <h4 className={styles.instructions}>
        Enter the name of a language and press Search to retrieve a list of
        countries with that as their official language.
      </h4>
      <Container>
        <Row>
          <Col>
            <ul className={styles.list}>
              {names.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Col>
          <Col>
            <Row className={styles.languageSearchRow}>
              <Form.Control
                className={styles.languageInput}
                type="text"
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="language here!"
              />
              <Button
                className={styles.button}
                onClick={() => handleSearch(language)}
              >
                Search
              </Button>
            </Row>
            <Row className={styles.error}>
              <span>{error}</span>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Countries;
