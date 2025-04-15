import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Comment } from '../../types/Types'
import { Typography } from '../../styles'

interface CommentProps {
    comment: Comment
}

const CommentComponent = ({ comment }: CommentProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.authorText}>{comment.authorName}:&nbsp;</Text>
      <Text style={styles.commentText}>{comment.content}</Text>
    </View>
  )
}

export default CommentComponent

const styles = StyleSheet.create({
      commentText: {
          ...Typography.typography.body,
          fontFamily:'NotoSerif-Regular',
          marginVertical: 5,
          textAlign: 'left',
      },row:{
        flexDirection:'row',
        alignItems:'center',
      },
      authorText: {
          ...Typography.typography.body,
          fontFamily: 'NotoSerif-Bold',
          marginRight: 5,
      }
})