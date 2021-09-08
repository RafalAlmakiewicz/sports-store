import React from "react";

const ActivityFilter = ({ activities, value, onSelectActivity }) => {
  return (
    <select
      defaultValue={value}
      onChange={(e) => {
        onSelectActivity(e.currentTarget.value);
      }}
    >
      <option key="0" value="">
        --activity--
      </option>
      {activities.map((a) => (
        <option key={a._id} value={a._id}>
          {a.name}
        </option>
      ))}
    </select>
  );
};

export default ActivityFilter;
