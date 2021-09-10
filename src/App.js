import './App.css';

import ReconnectingWebSocket from 'reconnecting-websocket';
import {useEffect, useMemo, useState} from "react";


function App() {
    const [activeSessions, setActiveSessions] = useState({})
    const wsBackendUrl = process.env.REACT_APP_WS_BACKEND_URL
    const publicAppUrl = process.env.REACT_APP_PUBLIC_APP_URL
    const rws = useMemo(() => (new ReconnectingWebSocket(wsBackendUrl + '/ws-dashboard')), [wsBackendUrl]);

    useEffect(() => {
        rws.addEventListener('message', (message) => {
            // console.log(JSON.parse(message.data))
            setActiveSessions(JSON.parse(message.data))
        })
    }, [rws])

    function renderSessions() {
        return Object.keys(activeSessions).map((key) => {
            return (
                <div key={key}>
                    <div>Visitor ID: {key}</div>
                    {renderSession(activeSessions[key])}
                </div>
            )
        })

    }

    function renderSession(activeSession) {
        return (
            <div className="App-items">
                {
                    Object.keys(activeSession).map((el) => {
                        return (
                            <div key={el} className="App-item">
                                <img
                                    src={"https://picsum.photos/id/" + el + "/100/100"}
                                    alt={el}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className="App">
            <div className="App-container">
                <div className="App-intro">
                    <div>This is demo dashboard app. Open <a href={publicAppUrl} target="_blank"
                                                               rel="noreferrer">demo public app</a> in multiple browsers and try to scroll
                        images on that page. Dashboard will track your
                        current active items.
                    </div>

                </div>

                {renderSessions()}
            </div>
        </div>
    );
}

export default App;
