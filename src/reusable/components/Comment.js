import React from 'react';
import type { User } from '../types/User';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import DeleteIcon from 'material-ui-icons/Delete';

type Props = {
  user: User,
  interactionHandler: (type: string) => undefined,
  isAdmin: boolean,
  content: string
};

type State = {
  expanded: boolean
};

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 194
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  flexGrow: {
    flex: '1 1 auto'
  }
});

class Comment extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }
  render() {
    return (
      <Card>
        <CardHeader
          avatar={
            this.props.user.photoUrl ? (
              <Avatar src={this.props.user.photoUrl} />
            ) : (
              <Avatar>{this.props.user.displayName.charAt(0)}</Avatar>
            )
          }
          title={this.props.user.displayName}
          subheader={this.props.content}
        />
        {this.props.isAdmin ? (
          <CardActions>
            <div
              style={{
                flex: '1 1 auto'
              }}
            />
            <IconButton
              onClick={() => this.props.interactionHandler('delete')}
              aria-label="Delete"
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        ) : null}
      </Card>
    );
  }
}

export default withStyles(styles)(Comment);
