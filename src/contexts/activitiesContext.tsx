import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ApiCaller from "../ApiCaller";
import { apiEndpoint } from "../apiEndpoint";
import { Activity } from "../types";

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

  const activitiesApi = useRef(
    new ApiCaller<Activity>(`${apiEndpoint}/activities`)
  );

  const getAllActivities = () => {
    activitiesApi.current.getAll().then((activities) => {
      setActivities(activities);
    });
  };

  useEffect(() => {
    getAllActivities();
  }, []);

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
