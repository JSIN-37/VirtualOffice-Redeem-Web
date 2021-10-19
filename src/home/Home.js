import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    useHistory,
} from "react-router-dom";
import { Center, Box, Image, Text, Button } from "@chakra-ui/react"
import axios from "axios";
import AdminArea from "../user_areas/AdminArea";
import EmployeeArea from "../user_areas/EmployeeArea";
import Config from "../admin/setup/Config";
import Login from "../login/Login";
import { server_status_url } from "../app_data/public_urls";
import { org_info_url } from "../app_data/public_urls";

//import logo from "../img/logo.png"

//const employeeURL =`${BACKEND_URL}/employee/login`
//replace with mechanism to check if signed in.

export default function Home() {
    //has the admin  configured the system?
    const [configured, setConfigured] = useState();

    //get organization details if system is configured.
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        axios
            .get(server_status_url)
            .then((response) => {
                if (response.data.serverInitialized) {
                    return axios.get(org_info_url);
                } else {
                    setConfigured(false);
                }
            })
            .then((response) => {
                setOrganization(response.data);
                setConfigured(true);
            })
            .catch((error) => {
                console.log("Error at home page -> ", error);
            });
    }, []);

    return (
        <>
            <Router>
                <Route exact path="/">
                    {configured && <ConfiguredHome organization={organization} />}
                    {!configured && <UnconfiguredHome status={configured} />}
                </Route>

                <Route path="/admin">
                    <AdminArea />
                </Route>
                <Route path="/employee">
                    <EmployeeArea />
                </Route>

                <Route exact path="/setup">
                    <Config />
                </Route>
                <Route exact path="/admin/login">
                    <Login admin />
                </Route>
                <Route exact path="/employee/login">
                    <Login employee />
                </Route>
            </Router>
        </>
    );
}

const ConfiguredHome = ({ organization }) => {
    const history = useHistory();

    function handleAdminLogin() {
        history.push("/admin");
    }

    function handleEmployeeLogin() {
        history.push("/employee");
    }

    return (
        <>
            <div>Backend response {"-> "}admin has set up system</div>
            <h2>{organization && organization.organizationName}</h2>
            <h2>{organization && organization.organizationAddress}</h2>
            <h2>{organization && organization.organizationCountry}</h2>
            <h2>{organization && organization.organizationContactNumber}</h2>
            <Button colorScheme="purple" variant="solid" m={2} onClick={handleAdminLogin}>Admin Login - setup done</Button>
            <Button colorScheme="purple" variant="solid" m={2} onClick={handleEmployeeLogin}>Employee login</Button>
        </>
    );
};

const UnconfiguredHome = ({ status }) => {
    const history = useHistory();

    function handleEmployeeLogin() {
        alert("System not setup. Contact system administrator!");
    }

    function handleAdminLogin() {
        history.push("/setup");
    }

    return (
        <>
            {status === undefined && <div>Connecting to server..</div>}

            {status === false && (
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "90vh",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Center h="100vh">
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            maxW="lg"
                            boxShadow="lg"
                            borderRadius="20px"
                            overflow="hidden" p={4} >

                            <Box boxSize="90px">
                                <Image
                                    objectFit="cover"
                                    src="https://raw.githubusercontent.com/JSIN-37/VirtualOffice-Redeem-Web/main/src/img/logo.png"
                                    alt="logo"
                                    mt={2}
                                />
                            </Box>

                            <Text fontSize="md" m={2} mt={0} gutterBottom>
                                Admin has not configured system OR failed to connect to server
                            </Text>

                            <Button colorScheme="purple" variant="solid" m={2} onClick={handleAdminLogin}>
                                Admin login - set up not done
                            </Button>
                            <Button colorScheme="purple" variant="solid" m={2} onClick={handleEmployeeLogin}>
                                Employee Login - not set up / error
                            </Button>
                        </Box>
                    </Center>
                </div>
            )}
        </>
    );
};