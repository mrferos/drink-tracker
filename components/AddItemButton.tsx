import {Button} from "react-bootstrap";
import BottomDrawer from "./BottomDrawer";

export default function AddItemButton({title, showElement}) {
    return (
        <BottomDrawer>
            <Button variant="primary" size={"lg"} className={"w-100"} onClick={() => showElement(true)}>{title}</Button>
        </BottomDrawer>
    )
}