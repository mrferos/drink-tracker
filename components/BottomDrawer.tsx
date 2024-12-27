export default function BottomDrawer({children}) {
    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                textAlign: "center",
                backgroundColor: "#fff",
                padding: "10px",
                boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
            }}
        >
            {children}
        </div>
    )
}