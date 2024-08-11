import React, { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const VideoChat = () => {
    const [localStream, setLocalStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const { sendMessage, lastMessage } = useWebSocket('ws://localhost:8080', {
        onMessage: (event) => {
            const data = JSON.parse(event.data);
            handleSignalingMessage(data);
        },
    }, true);

    useEffect(() => {
        const init = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };

        init();
    }, []);

    useEffect(() => {
        if (localStream) {
            const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
            setPeerConnection(pc);

            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    sendMessage(JSON.stringify({ iceCandidate: event.candidate }));
                }
            };

            pc.ontrack = (event) => {
                console.log('Remote track received:', event);
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                }
            };

            localStream.getTracks().forEach((track) => {
                pc.addTrack(track, localStream);
            });

            return () => {
                pc.close();
            };
        }
    }, [localStream]);

    const handleSignalingMessage = async (data) => {
        console.log('Received signaling message:', data);
        if (peerConnection) {
            if (data.offer) {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                sendMessage(JSON.stringify({ answer: answer }));
            } else if (data.answer) {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
            } else if (data.iceCandidate) {
                await peerConnection.addIceCandidate(new RTCIceCandidate(data.iceCandidate));
            }
        }
    };

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted></video>
            <video ref={remoteVideoRef} autoPlay></video>
        </div>
    );
};

export default VideoChat;
