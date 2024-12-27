import {Button, Form, Modal} from "react-bootstrap";

export default function AddSessionDialogue({modalShow, setModalShow, onSave}) {
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        return onSave(data)
    }

    const date = new Date()
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
    let generalTime = ''
    if(date.getHours() > 6 && date.getHours() < 12) {
        generalTime = 'morning'
    } else if(date.getHours() > 12 && date.getHours() < 18) {
        generalTime = 'afternoon'
    } else {
        generalTime = 'evening'
    }

    const name = `${dayOfWeek} ${generalTime}'s session`

    return (
        <>
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Session</Modal.Title>
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
                                defaultValue={name}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalShow(false)}>
                            Close
                        </Button>
                        <Button variant="primary" type={"submit"}>
                            Start!
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}