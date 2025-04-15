import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/state/store";
import { useState } from "react";
import { postComment } from "../store/state/tickets/ticketSlice";

export const useAddComment = (
    ticketId: string | undefined,
    authorId: string,
    authorName
) => {
    const dispatch: AppDispatch = useDispatch();
    const [showAddComment, setShowAddComment] = useState(false);
    const [commentText, setCommentText] = useState<string>("");

    const addComment = (comment: string) => {
        dispatch(
            postComment({
                ticketId: ticketId!,
                commentText: commentText,
                authorId: authorId,
                authorName: authorName,
            })
        );
        setCommentText("");
        setShowAddComment(false); // Close the modal after adding the comment
    };

    return {
        addComment,
        showAddComment,
        setShowAddComment,
        commentText,
        setCommentText,
    };
};
