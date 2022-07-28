import React, {useEffect, useState} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import FAvatar from "./components/FAvatar";




const client = new W3CWebSocket('ws:https://62e31026e09762000824bc54--playful-crostata-04220b.netlify.app/:8000');

const ChatBox = () => {

    const [name,setName]= useState('')
    const [msg,setMsg]= useState('')
    const [serverMesgages,setServerMessages] = useState([])

    useEffect(()=>{
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            setServerMessages([...serverMesgages,...dataFromServer])
            console.log('got reply! ', dataFromServer);
            if (dataFromServer.type === "message") {

            }
        };
    },[])

    const onButtonClicked = () => {

        console.log("send from client to server ",msg," | ",name)
        client.send(JSON.stringify({
            message: msg,
            name: name
        }));

    }

    return (<>

        <div className={"border h-64  w-6/12 overflow-y-scroll p-2"}>
            {serverMesgages.slice(0).reverse().map(msg=>
                <div className={"flex   gap-2 mb-3"} key={msg._id}>
                    <FAvatar name={msg.name}/>
                    <div className={"flex  flex-col"}>
                        <span className={"font-medium leading-4"}>    {msg.name}</span>
                        <span className={"text-sm"}>   {msg.message}</span>
                    </div>
                    <span className={"text-sm ml-auto"}>{msg.timeStamp}</span>

                </div>
            )}
        </div>

            <input
                className={"border rounded p-1"}
                type={"name"}
                placeholder={"Enter your Name"}
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
            />

            <div className={"flex mt-2 "}>

            <textarea
                className={"border"}
                type={"msg"}
                placeholder={"Enter your Messgae"}
                value={msg}
                onChange={(e)=>{setMsg(e.target.value)}}
            />
            <button  className={"  p-1 rounded text-sm font-medium bg-amber-400 "} onClick={()=>onButtonClicked()}>Send Message</button>
        </div>


    </>

    )


}
export default ChatBox


