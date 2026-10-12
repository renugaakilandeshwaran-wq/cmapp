
import { useCallback, useEffect, useRef, useState } from "react";
import socket from "../socket";

type CallType = "audio" | "video";

type IncomingCall = {
    from: string;
    offer: RTCSessionDescriptionInit;
    callType: CallType;
};

export function useWebRTCCall(roomId: string) {
    const peerRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
    const remoteSocketRef = useRef<string | null>(null);

    const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
    const [callType, setCallType] = useState<CallType | null>(null);
    const [inCall, setInCall] = useState(false);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState("");

    const createPeer = useCallback((type: CallType) => {
        const peer = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
            ],
        });


        peer.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("ice-candidate", {
                    roomId,
                    candidate: event.candidate.toJSON(),
                });
            }
        };

        peer.ontrack = (event) => {
            setRemoteStream(event.streams[0] ?? null);
        };

        peer.onconnectionstatechange = () => {
            if (peer.connectionState === "connected") {
                setInCall(true);
            }
            if (peer.connectionState === "failed" || peer.connectionState === "disconnected") {
                setError("Call connection lost. Please try again.");
            }
        };

        peerRef.current = peer;
        setCallType(type);
        return peer;
    }, [roomId]);

    const getLocalMedia = useCallback(async (type: CallType) => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: type === "video",
        });

        localStreamRef.current = stream;
        setLocalStream(stream);
        return stream;
    }, []);

    const startCall = useCallback(async (type: CallType) => {
        try {
            setError("");
            socket.emit("join-room", roomId);

            const stream = await getLocalMedia(type);
            const peer = createPeer(type);

            stream.getTracks().forEach((track) => {
                peer.addTrack(track, stream);
            });

            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);

            socket.emit("call-user", {
                roomId,
                offer,
                callType: type,
            });

            setInCall(true);
        } catch {
            setError("Unable to access microphone/camera. Please allow browser permissions.");
        }
    }, [roomId, getLocalMedia, createPeer]);

    const acceptCall = useCallback(async () => {
        if (!incomingCall) return;

        try {
            setError("");
            remoteSocketRef.current = incomingCall.from;

            const stream = await getLocalMedia(incomingCall.callType);
            const peer = createPeer(incomingCall.callType);

            stream.getTracks().forEach((track) => {
                peer.addTrack(track, stream);
            });

            await peer.setRemoteDescription(
                new RTCSessionDescription(incomingCall.offer)
            );

            for (const candidate of pendingCandidatesRef.current) {
                await peer.addIceCandidate(new RTCIceCandidate(candidate));
            }
            pendingCandidatesRef.current = [];

            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);

            socket.emit("answer-call", {
                to: incomingCall.from,
                answer,
            });

            setIncomingCall(null);
            setInCall(true);
        } catch {
            setError("Could not accept call. Check microphone/camera permissions.");
        }
    }, [incomingCall, getLocalMedia, createPeer]);

    const rejectCall = useCallback(() => {
        if (incomingCall) {
            socket.emit("reject-call", { to: incomingCall.from });
        }
        setIncomingCall(null);
    }, [incomingCall]);

    const endCall = useCallback(() => {
        socket.emit("end-call", { roomId });

        peerRef.current?.close();
        peerRef.current = null;

        localStreamRef.current?.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;

        setLocalStream(null);
        setRemoteStream(null);
        setIncomingCall(null);
        setInCall(false);
        setCallType(null);
        remoteSocketRef.current = null;
        pendingCandidatesRef.current = [];
    }, [roomId]);

    useEffect(() => {
        const onIncomingCall = (data: IncomingCall) => {
            remoteSocketRef.current = data.from;
            setIncomingCall(data);
        };

        const onCallAnswered = async (data: {
            from: string;
            answer: RTCSessionDescriptionInit;
        }) => {
            remoteSocketRef.current = data.from;

            const peer = peerRef.current;
            if (peer && !peer.remoteDescription) {
                await peer.setRemoteDescription(
                    new RTCSessionDescription(data.answer)
                );

                for (const candidate of pendingCandidatesRef.current) {
                    await peer.addIceCandidate(new RTCIceCandidate(candidate));
                }
                pendingCandidatesRef.current = [];
            }
        };

        const onIceCandidate = async (data: {
            from: string;
            candidate: RTCIceCandidateInit;
        }) => {
            if (data.from === socket.id) return;

            const peer = peerRef.current;

            if (peer?.remoteDescription) {
                try {
                    await peer.addIceCandidate(new RTCIceCandidate(data.candidate));
                } catch (err) {
                    console.error("ICE candidate error:", err);
                }
            } else {
                pendingCandidatesRef.current.push(data.candidate);
            }
        };

        const onCallEnded = () => {
            peerRef.current?.close();
            peerRef.current = null;
            localStreamRef.current?.getTracks().forEach((track) => track.stop());
            localStreamRef.current = null;
            setLocalStream(null);
            setRemoteStream(null);
            setIncomingCall(null);
            setInCall(false);
            setCallType(null);
            remoteSocketRef.current = null;
            pendingCandidatesRef.current = [];
        };

        const onCallRejected = () => {
            setError("The other user rejected the call.");
            onCallEnded();
        };

        socket.on("incoming-call", onIncomingCall);
        socket.on("call-answered", onCallAnswered);
        socket.on("ice-candidate", onIceCandidate);
        socket.on("call-ended", onCallEnded);
        socket.on("call-rejected", onCallRejected);

        return () => {
            socket.off("incoming-call", onIncomingCall);
            socket.off("call-answered", onCallAnswered);
            socket.off("ice-candidate", onIceCandidate);
            socket.off("call-ended", onCallEnded);
            socket.off("call-rejected", onCallRejected);
        };
    }, []);

    useEffect(() => {
        socket.emit("join-room", roomId);
    }, [roomId]);

    return {
        startCall,
        acceptCall,
        rejectCall,
        endCall,
        incomingCall,
        callType,
        inCall,
        localStream,
        remoteStream,
        error,
    };
}
