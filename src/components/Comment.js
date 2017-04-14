import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import Content from './Content';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import styles from '../styles/components/_Comment';
import colors from '../styles/common/_colors';
import { CommentButton } from './button';
import { parseContentWithImage } from '../utils/contentParser';

export default class Comment extends Component {
  render() {
    let {
      comment: {
        reply_id,
        reply_name,
        userTitle,
        icon,
        position,
        reply_content,
        posts_date,
        is_quote,
        quote_content,
        mobileSign
      },
      router
    } = this.props;

    posts_date = moment(+posts_date).startOf('minute').fromNow();

    return (
      <View style={styles.commentItem}>
        <View style={styles.authorInfo}>
          <TouchableHighlight
            underlayColor={colors.underlay}
            onPress={() => router.toIndividual({
              userId: reply_id,
              userName: reply_name,
              userAvatar: icon
            }, false)}>
            <Image
              style={styles.avatar}
              source={{ uri: icon }} />
          </TouchableHighlight>
          <View style={styles.author}>
            <Text style={styles.name}>{reply_name}</Text>
            <Text style={styles.level}>{userTitle}</Text>
          </View>
          <Text style={styles.floor}>#{position - 1}</Text>
        </View>
        <View style={styles.comment}>
          {!!is_quote &&
            <View style={styles.quote}>
              <Text style={styles.quoteContent}>{quote_content}</Text>
            </View>
          }
          <Content content={reply_content}
                   router={router} />
        </View>
        <View style={styles.other}>
          <Text style={styles.date}>{posts_date}</Text>
          {!!mobileSign &&
            <View style={styles.mobileWrapper}>
              <Icon style={styles.mobileIcon} name='mobile' />
              <Text style={styles.mobileText}>{mobileSign}</Text>
            </View>
          }
          {this.props.token &&
            <CommentButton
              style={styles.reply}
              onPress={() => this.props.openReplyModal()} />
          }
        </View>
      </View>
    );
  }
}
