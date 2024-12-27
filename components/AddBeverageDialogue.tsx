import {Button, Form, Modal} from "react-bootstrap";

export default function AddBeverageDialogue({modalShow, setModalShow, editing, onSave}) {
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
                    <Modal.Title>{editing && "Edit" || "Add"} Beverage</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>

                            {/* Name Field */}
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                />
                            </Form.Group>

                            {/* Volume Field */}
                            <Form.Group controlId="formVolume" className="mb-3">
                                <Form.Label>Volume (ml)</Form.Label>
                                <Form.Control
                                    type="number"
                                    inputMode="numeric"
                                    placeholder="Enter volume"
                                    name="volume"
                                />
                            </Form.Group>

                            {/* Proof Field */}
                            <Form.Group controlId="formProof" className="mb-3">
                                <Form.Label>Proof (%)</Form.Label>
                                <Form.Control
                                    type="number"
                                    inputMode="numeric"
                                    placeholder="Enter proof"
                                    name="proof"
                                />
                            </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalShow(false)}>
                            Close
                        </Button>
                        <Button variant="primary" type={"submit"}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}