import React from "react";
import styles from "./Addition.module.css";
import { Col, Container, Row } from "react-bootstrap";

const Addition = (): JSX.Element => {
  const [sum, setSum] = React.useState(0);
  const [addend1, setAddend1] = React.useState(0);
  const [addend2, setAddend2] = React.useState(0);

  React.useEffect(() => {
    setSum(addend1 + addend2);
  }, [addend1, addend2]);

  return (
    <div>
      <h2 className={styles.heading}>Addition Component</h2>
      <Container>
        <Row>
          <Col className={styles.column}>
            <input
              id="addend1"
              className={styles.input}
              type="number"
              defaultValue={addend1.toString()}
              onChange={(e) => setAddend1(parseInt(e.target.value, 10))}
            />
          </Col>
          <Col className={styles.column}>
            <span className={styles.text}>+</span>
          </Col>
          <Col className={styles.column}>
            <input
              id="addend2"
              className={styles.input}
              type="number"
              defaultValue={addend2.toString()}
              onChange={(e) => setAddend2(parseInt(e.target.value, 10))}
            />
          </Col>
          <Col className={styles.column}>
            <span className={styles.text}>=</span>
          </Col>
          <Col className={styles.column}>
            {isNaN(sum) ? (
              <span className={styles.warning}>
                Please enter a value in both inputs.
              </span>
            ) : (
              <span className={styles.sum}>{sum}</span>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Addition;
