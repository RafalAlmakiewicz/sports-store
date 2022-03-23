import { createContext, useContext, useMemo, useState } from "react";
import { Activity } from "../types";
import { useApi } from "./apiContext";

interface ActivitiesContext {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  getAllActivities: () => void;
}

const activitiesContext = createContext<ActivitiesContext>(
  {} as ActivitiesContext
);

export const useActivities = () => useContext(activitiesContext);

export const ActivitiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const { activitiesApi } = useApi();

  const getAllActivities = async () => {
    let data = await activitiesApi.getAll();
    setActivities(data);
  };

  const value = useMemo(() => {
    return {
      activities,
      setActivities,
      getAllActivities,
    };
  }, [activities]);

  return (
    <activitiesContext.Provider value={value}>
      {children}
    </activitiesContext.Provider>
  );
};
