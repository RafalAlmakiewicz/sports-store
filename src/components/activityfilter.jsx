import React from "react";
import DropDownList from "./dropDownList";

const ActivityFilter = ({ activities, value, onSelectActivity }) => {
  return (
    <DropDownList
      name="activityFilter"
      items={activities}
      valueProp="_id"
      textProp="name"
      value={value}
      onSelect={onSelectActivity}
      textForFirstOption="All activities"
    />
  );
};

export default ActivityFilter;
