import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import post from "../lib/ajax/post";

export default function AddBarDialogue({modalShow, setModalShow, editing, onSave}) {
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [llDisabled, setLlDisabled] = useState(true)
    const [csDisabled, setCSDisabled] = useState(true)
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        return onSave(data)
    }

    useEffect(() => {
        if(!modalShow) {
            return
        }

        navigator.geolocation.getCurrentPosition(({coords}) => {
            setLatitude(coords.latitude.toString())
            setLongitude(coords.longitude.toString())
            setLlDisabled(false)
            post('/api/geocoding/reverse', {
                lat: coords.latitude,
                lon: coords.longitude,
            }).then(resp => resp.json())
                .then(data => {
                    setCity(data.city)
                    setState(data.state)
                })
                .finally(() => setCSDisabled(false))
        }, (err) => {
            setLlDisabled(false)
            setCSDisabled(false)
        })
    }, [modalShow])

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
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
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
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                name="long"
                            />
                        </Form.Group>

                        <Form.Group controlId="forCity" className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter city"
                                disabled={csDisabled}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                name="city"
                            />
                        </Form.Group>

                        <Form.Group controlId="forState" className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter state"
                                disabled={csDisabled}
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                name="state"
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