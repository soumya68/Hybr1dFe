import Toast from "react-bootstrap/Toast";
function Toasters(props) {
  return (
    <>
      <Toast className="d-inline-block m-1" bg={props.variant.toLowerCase()}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{props.message}</strong>
        </Toast.Header>
        <Toast.Body className={props.variant === "Dark" && "text-white"}>
          {props.messageBody}
        </Toast.Body>
      </Toast>
    </>
  );
}

export default Toasters;
