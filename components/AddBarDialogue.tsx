import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function AddBarDialogue({modalShow, setModalShow, editing, onSave}) {
    const [latLong, setLatLong] = useState([0, 0])
    const [llDisabled, setLlDisabled] = useState(true)
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        return onSave(data)
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            setLatLong([coords.latitude, coords.longitude])
            setLlDisabled(false)
        }, (err) => {
            console.log(err)
            setLlDisabled(false)
        })
    }, [])

    return (
        <>
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editing && "Edit" || "Add"} Bar</Modal.Title>
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

                        <Form.Group controlId="forLat" className="mb-3">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter latitude"
                                defaultValue={latLong[0]}
                                disabled={llDisabled}
                                name="lat"
                            />
                        </Form.Group>

                        <Form.Group controlId="forLon" className="mb-3">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter longitude"
                                disabled={llDisabled}
                                defaultValue={latLong[1]}
                                name="long"
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