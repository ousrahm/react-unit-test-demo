import React from "react";
import "./Addition.styles.css";
import { Col, Container, Row } from "react-bootstrap";

const Addition = (): JSX.Element => {
  const [sum, setSum] = React.useState(0);
  const [addend1, setAddend1] = React.useState(0);
  const [addend2, setAddend2] = React.useState(0);

  React.useEffect(() => {
    setSum(addend1 + addend2);
  }, [addend1, addend2]);

  return (
    <>
      <h1 id="addition-h1">Addition Component</h1>
      <Container>
        <Row>
          <Col>
            <input
              type="number"
              defaultValue={addend1}
              onChange={(e) => setAddend1(parseInt(e.target.value, 10))}
            />
          </Col>
          <Col>
            <span className="addition-text">+</span>
          </Col>
          <Col>
            <input
              type="number"
              defaultValue={addend2}
              onChange={(e) => setAddend2(parseInt(e.target.value, 10))}
            />
          </Col>
          <Col>
            <span className="addition-text">=</span>
          </Col>
          <Col>
            {isNaN(sum) ? (
              <span id="addition-warning">
                Please enter a value in both inputs.
              </span>
            ) : (
              <span className="addition-text" id="sum">
                {sum}
              </span>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Addition;
