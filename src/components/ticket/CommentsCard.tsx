import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, Spacing, Typography } from "../../styles";
import CommentComponent from "./CommentComponent";

const CommentsCard = ({ comments }) => {
    console.log("comments:", comments);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>הערות:</Text>
            {comments.map((comment, index) => (
                <View style={styles.commentContainer} key={index}>
                    <View style={styles.seperator} />
                    <CommentComponent comment={comment} />
                </View>
            ))}
            {comments.length === 0 && (
                <Text style={styles.noComments}>No comments available.</Text>
            )}
        </View>
    );
};

export default CommentsCard;

const styles = StyleSheet.create({
    noComments: {
        textAlign: "center",
        marginTop: 10,
        color: "gray",
    },
    container: {
        marginTop: Spacing.spacing.m,
        padding: Spacing.spacing.m,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 10,
        shadowColor: Colors.colors.shade,
        shadowOffset: { width: 0, height: 2 },
        marginVertical: Spacing.spacing.s,
    },
    seperator: {
        height: 1,
        backgroundColor: Colors.colors.shade,
    },
    title: {
        ...Typography.typography.subheading,
        fontFamily: "Rubik-Bold",
        textAlign: "center",
    },commentContainer:{
        marginVertical: Spacing.spacing.xs,
        paddingVertical: Spacing.spacing.s,
    }
});
