import React, {useEffect, useState} from 'react'
import { Alert, Button, Modal, Input, Form, InputNumber } from 'antd';
import { useLocation, withRouter } from 'react-router-dom'
import axios from 'axios';

function Profile(props) {
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState(false);
    const [sent, setSent] = useState(false);
    const [graphSaved, setGraphSaved] = useState(false);
    const [graphRetrieved, setGraphRetrieved] = useState(false);
    const [failedRetrieve, setFailedRetrieve] = useState(false);
 
    useEffect(() => {}, [props.modal]);

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const authenticate = (email) => {
        if(validateEmail(email)) {
            fetch('https://graphtt.herokuapp.com/login', {
                method: 'POST',
                body: JSON.stringify({
                    'email': email, // change here
                    'route': "https://graph-tool.netlify.app/#/"
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(response => response.json()).then(msg => setSent(true))
        } else {
            setEmailError(true);
        }
    }

    const getGraph = () => {
        if(props.loggedIn == true) {
            fetch('https://graphtt.herokuapp.com/api/retrieve', {
                method: 'POST',
                body: JSON.stringify({
                    'type': "retrieve",
                    'email': localStorage.getItem("email")
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(response => response.json()).then(msg => {setGraphRetrieved(true)
                let e = new Map(JSON.parse(msg.edges));
                let bp = new Map(JSON.parse(msg.bentpos));
                props.setGraph(e, JSON.parse(msg.vertices), bp);
            })
        }
    }

    const saveGraph = () => {
        if(props.loggedIn == true) {
            fetch('https://graphtt.herokuapp.com/api/upload', {
                method: 'POST',
                body: JSON.stringify({
                    'type': "upload",
                    'email': localStorage.getItem("email"),
                    'edges': JSON.stringify(Array.from(props.edges.entries())),
                    'vertices': JSON.stringify(props.vertices),
                    'bentpos': JSON.stringify(Array.from(props.bendPositions.entries()))
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(response => response.json()).then(msg => {setGraphSaved(true)})
        }
    }

    const exit = () => {
        props.setModal(false); setEmailError(false); setSent(false); setGraphRetrieved(false); setGraphSaved(false); setFailedRetrieve(false);
    }

    const getProfile = () => {
        let footer = (
            <React.Fragment>
                <Button key="back" onClick={() => {exit()}}>
                    Return
                </Button>
                <Button type="primary" key="back" onClick={() => {exit(); props.logOut()}}>
                    Log out
                </Button>
            </React.Fragment>
        )

        return (
            <Modal style={{top: "22%"}} width={"550px"} bodyStyle={{minHeight:"120px"}} title={"Logged into " + localStorage.getItem("email")} visible={props.modal} 
                    onOk={() => {exit()}} onCancel={() => {exit()}}
                    footer={footer}>
                <div style={{display:'flex', width:"100%", justifyContent:"center", marginBottom:"5px", marginTop:"-15px", flexWrap:"wrap"}}>
                    <div style={{display:"flex", flexWrap:'wrap', justifyContent:"center", width:"220px"}}>
                        <div style={{margin:"14px", fontSize:"18px", fontWeight:"480"}}>Save current graph:</div>
                        <Button type="primary" onClick={() => {saveGraph(); setGraphSaved(false); setGraphRetrieved(false); setFailedRetrieve(false)}}>
                            Save Graph
                        </Button>
                    </div>
                    <div style={{display:"flex", flexWrap:'wrap', justifyContent:"center", width:"220px"}}>
                        <div style={{margin:"14px", fontSize:"18px", fontWeight:"480"}}>Retrieve saved graph:</div>
                        <Button type="primary" onClick={() => {getGraph(); setGraphSaved(false); setGraphRetrieved(false); setFailedRetrieve(false)}}>
                            Retrieve Graph
                        </Button>
                    </div>
                    <div style={{marginTop:"45px", marginBottom:"-15px"}}>(Currently this feature is limited to 1 graph per user)</div>
                </div>
                {graphSaved ? successfullySaved() : <React.Fragment/>}
                {graphRetrieved ? successfullyRetrieved() : <React.Fragment/>}
                {failedRetrieve ? unsuccessfulRetrieve() : <React.Fragment/>}
            </Modal>
        )
    }

    const sentMessage = () => {
        return (
            <React.Fragment>
                <div style={{height:"40px", width:"100%", marginTop:"23px"}}>
                    <Alert message={"Email successfully sent to " + email} type="success" showIcon/>
                </div>
            </React.Fragment>
        )
    }

    const emailErrorMessage = () => {
        return (
            <React.Fragment>
                <div style={{height:"40px", width:"100%", marginTop:"23px"}}>
                    <Alert message="Invalid Email" type="error" showIcon />
                </div>
            </React.Fragment>
        )
    }

    const successfullyRetrieved = () => {
        return (
            <React.Fragment>
                <div style={{height:"40px", width:"100%", marginTop:"25px"}}>
                    <Alert message={"Graph successfully retrieved"} type="success" showIcon/>
                </div>
            </React.Fragment>
        )
    }

    const successfullySaved = () => {
        return (
            <React.Fragment>
                <div style={{height:"40px", width:"100%", marginTop:"25px"}}>
                    <Alert message={"Graph successfully saved"} type="success" showIcon/>
                </div>
            </React.Fragment>
        )
    }

    const unsuccessfulRetrieve = () => {
        return (
            <React.Fragment>
                <div style={{height:"40px", width:"100%", marginTop:"25px"}}>
                    <Alert message="No graph to retrieve. Save a graph first!" type="error" showIcon />
                </div>
            </React.Fragment>
        )
    }

    const getLogin = () => {
        let footer = (
            <React.Fragment>
                <Button key="back" onClick={() => {exit()}} style={{marginTop:"10px", marginBottom:"10px", marginRight:"47.5%"}}>
                    Return
                </Button>
                <Button type="primary" key="back" onClick={() => {authenticate(email)}} style={{positon:"absolute", right: "10px"}}>
                    Send Confirmation Email
                </Button>
            </React.Fragment>
        )

        return (
            <Modal style={{top: "22%"}} width={"550px"} bodyStyle={{minHeight:"100px"}} title="Log In To Save Graphs" visible={props.modal} 
                    onOk={() => {exit()}} onCancel={() => {exit()}}
                    footer={footer} onClick={() => setEmailError(false)}>
                <div onClick={() => {setEmailError(false);}}>
                <Form name="basic" style={{height:"30px"}}>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input onChange={(e) => {setEmail(e.target.value)}}/>
                    </Form.Item>
                </Form>
                {sent ? sentMessage() : <React.Fragment/>}
                {emailError ? emailErrorMessage() : <React.Fragment/>}
                </div>
            </Modal>
        )
    }

    return (
        <React.Fragment>
            {props.loggedIn == true ?  getProfile() : getLogin()}
        </React.Fragment>
    )
}

export default withRouter(Profile)
