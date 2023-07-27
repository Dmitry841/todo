import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RowItem = ({ label, value }) => {
  return (
    <Container className="row_container">
      <div className="row_item">
        <Row className="row">
          <Col sm={4} className="col">
            {label}
          </Col>
          <Col sm={8} className="col">
            {value}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default RowItem;
