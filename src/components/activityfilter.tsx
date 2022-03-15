import React from "react";
import { useActivities } from "../contexts/activitiesContext";
import Select from "./select";

interface ActivityFilterProps {
  value: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const ActivityFilter = ({ value, handleChange }: ActivityFilterProps) => {
  const { activities } = useActivities();
  return (
    <Select
      name="activities"
      items={activities}
      valueProp="_id"
      textProp="name"
      value={value}
      handleChange={handleChange}
      textForFirstOption="All activities"
    />
  );
};

export default ActivityFilter;
