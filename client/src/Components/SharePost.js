import {
  Button,
  Col,
  Container,
  Row,
  Input,
} from "reactstrap";

const SharePosts = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Input
            id="share"
            name="share"
            placeholder="Share your thoughts..."
            type="textarea"
          />
          <Button>PostIT</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SharePosts;
