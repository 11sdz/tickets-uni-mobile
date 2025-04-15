import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/state/store";
import { patchTicket } from "../store/state/tickets/ticketSlice";
import { ButtonHandle, ButtonLayout } from "../components/buttons/Button";
import { router } from "expo-router";

export const useRadialMenu = (ticketId: string | undefined) => {
    const dispatch: AppDispatch = useDispatch();
    const buttonRadialRef = useRef<ButtonHandle>(null);
    const [showRadialMenu, setShowRadialMenu] = useState(false);
    const [radialMenuPosition, setRadialMenuPosition] = useState<ButtonLayout | null>(null);

    const handleRadialActions = useCallback((
        type: "completeTicket" | "uncompleteTicket" | "inprogressTicket" | "openRadialMenu"
    ) => {
        if (!ticketId && type !== "openRadialMenu") {
            console.error("Ticket ID is undefined");
            return;
        }

        switch (type) {
            case "completeTicket":
            case "uncompleteTicket":
            case "inprogressTicket": {
                const statusMap = {
                    completeTicket: "completed",
                    uncompleteTicket: "uncompleted",
                    inprogressTicket: "inprogress",
                };
                dispatch(
                    patchTicket({
                        _id: ticketId!,
                        updateData: { status: statusMap[type] },
                    })
                );
                router.back(); // Navigate back after action
                setShowRadialMenu(false);
                break;
            }

            case "openRadialMenu":
                buttonRadialRef.current?.measure?.()
                    .then((measureButton) => {
                        if (measureButton) {
                            setRadialMenuPosition(measureButton);
                        }
                    })
                    .catch((error) => {
                        console.error("Error measuring button:", error);
                    });
                setShowRadialMenu((prev) => !prev);
                break;
        }
    }, [ticketId, dispatch]);

    const radialMenuItems = useMemo(() => [
        { label: "טופל", onPress: () => handleRadialActions("completeTicket") },
        { label: "לא טופל", onPress: () => handleRadialActions("uncompleteTicket") },
        { label: "בטיפול", onPress: () => handleRadialActions("inprogressTicket") },
    ], [handleRadialActions]);

    return {
        showRadialMenu,
        setShowRadialMenu,
        radialMenuPosition,
        radialMenuItems,
        handleRadialActions,
        buttonRadialRef,
    };
};
