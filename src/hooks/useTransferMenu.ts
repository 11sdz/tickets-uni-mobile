import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { AppDispatch, RootState } from "../store/state/store";
import { fetchStatusData } from "../store/state/user/statusSlice"; // Import fetchStatusData action
import { patchTicket } from "../store/state/tickets/ticketSlice";
import { StatusData } from "../types/Types";

export const useTransferMenu = (ticketId: string | undefined) => {
    const dispatch: AppDispatch = useDispatch();
    const [showTransferMenu, setShowTransferMenu] = useState(false);
    const agents = useSelector((state: RootState) => state.status.StatusData); // Get agents from Redux store

    useEffect(() => {
        dispatch(fetchStatusData());
    }, [dispatch]); // Empty dependency array means it will run only once when the component mounts

    const handleTransferTicket = useCallback(
        (ticketId: string, newAgent: string) => {
            if (!ticketId || !newAgent) {
                console.error("Ticket ID or new agent is undefined");
                return;
            }
            dispatch(
                patchTicket({ _id: ticketId, updateData: { agent: newAgent } })
            );
            console.log(`Transferring ticket ${ticketId} to agent ${newAgent}`);
            setShowTransferMenu(false); // Close the transfer menu after transferring
        },
        [dispatch,ticketId] // Add ticketId to dependencies if needed
    );

    return {
        showTransferMenu,
        setShowTransferMenu,
        allAgents: agents as StatusData[] | null, // Cast agents to StatusData type
        handleTransferTicket,
    };
};
