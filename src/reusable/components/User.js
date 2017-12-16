import React from "react";
import type { User } from "../types/User";
import Avatar from "material-ui/Avatar";
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import Typography from "material-ui/Typography";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

export default class extends React.Component {
  props: {
    user: User
  };
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
          subheader={<span>{"since " + this.props.user.joinYear}</span>}
        />
        <CardContent>
          <Typography type="body1">
            <span>
              {this.props.user.info.name +
                " " +
                this.props.user.info.class +
                " " +
                this.props.user.info.classNo}
            </span>
          </Typography>
          <Typography type="display2">
            <span>{"Lv " + this.props.user.level}</span>
          </Typography>
          {this.props.showAllData ? (
            <div>
              <Typography type="display2">
                <span>{this.props.user.score}</span>
              </Typography>
              <Typography type="body1">
                <span>{"Number of stones: " + this.props.user.stones}</span>
              </Typography>
              <Typography type="body1">
                <span>{"Email: " + this.props.user.email}</span>
              </Typography>
            </div>
          ) : null}
          <Typography type="body1">
            <span>
              {"Admin: " + (this.props.user.permission > 0 ? "Yes" : "No")}
            </span>
          </Typography>
        </CardContent>
        {this.props.showAllData ? (
          <CardContent>
            <RadarChart
              cx={170}
              cy={170}
              outerRadius={100}
              width={340}
              height={340}
              data={Object.keys(this.props.user.stats).map(key => ({
                key: key.toUpperCase() + " " + this.props.user.stats[key],
                stat: this.props.user.stats[key]
              }))}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="key" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar
                name="Mike"
                dataKey="stat"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </CardContent>
        ) : null}
      </Card>
    );
  }
}
