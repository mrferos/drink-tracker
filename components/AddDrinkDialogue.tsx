import {Button, Form, Modal} from "react-bootstrap";

export default function AddDrinkDialogue({modalShow, setModalShow, onSave, bars, beverages}) {
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        return onSave(data)
    }

    return (
        <>
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add drink</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="formBeverage" className="mb-3">
                            <Form.Label>Beverage</Form.Label>
                            <Form.Select name="beverageId">
                                {Array.from(beverages, ([_, beverage]) => (
                                    <option key={beverage.id} value={beverage.id}>{beverage.name} ({Math.floor(beverage.proof_percentage/2)}%/{Math.floor(beverage.volume_in_ml*0.033814)}oz)</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formBar" className="mb-3">
                            <Form.Label>Bar</Form.Label>
                            <Form.Select name="barId">
                                {Array.from(bars, ([_, bar]) => (
                                    <option key={bar.id} value={bar.id}>{bar.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalShow(false)}>
                            Close
                        </Button>
                        <Button variant="primary" type={"submit"}>
                            Log it!
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}