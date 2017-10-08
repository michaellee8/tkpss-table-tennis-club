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
          <Typography type="display2">
            <span>{this.props.user.score}</span>
          </Typography>
          <Typography type="body1">
            <span>{"Email: " + this.props.user.email}</span>
          </Typography>
          <Typography type="body1">
            <span>
              {"Admin: " + (this.props.user.permission > 0 ? "Yes" : "No")}
            </span>
          </Typography>
        </CardContent>
        <CardContent>
          <RadarChart
            cx={300}
            cy={250}
            outerRadius={150}
            width={600}
            height={500}
            data={Object.keys(this.props.user.stats).map(key => ({
              key: key.toUpperCase() + " " + this.props.user.stats[key],
              stat: this.props.user.stats[key]
            }))}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="key" />
            <PolarRadiusAxis />
            <Radar
              name="Mike"
              dataKey="stat"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </CardContent>
      </Card>
    );
  }
}
