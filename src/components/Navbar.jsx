import { Button, Card, Stack } from "@mantine/core";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import { MdDescription, MdPeople } from "react-icons/md";

export default function AppNavbar() {
const location = useLocation();
const buttons = [
    {
        to: "/admin/paperlist",
        label: "Admin Paper List",
        icon: <MdDescription size={20} />,
    },
    {
        to: "/admin/userlist",
        label: "Admin User List",
        icon: <MdPeople size={20} />,
    },
];
return (
    <div>
        <Stack>
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    component={Link}
                    to={button.to}
                    variant={
                        location.pathname === button.to ||
                        (button.to === "/admin/paperlist" && location.pathname === "/admin")
                            ? "filled"
                            : "light"
                    }
                    fullWidth
                    leftSection={button.icon}
                >
                    {button.label}
                </Button>
            ))}
        </Stack>
    </div>
);
}
