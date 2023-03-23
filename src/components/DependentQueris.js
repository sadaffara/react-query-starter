import { useFetchData } from "../hooks/useFetchData";

const DependentQueries = ({ email }) => {
  const { isLoading: usersLoading, data: user } = useFetchData(
    ["users-data", email],
    "http://localhost:4000/users/" + email
  );
  const classId = user?.data.classId;

  const { data: calsses, isLoading: classesLoading } = useFetchData(
    ["classes-data", classId],
    // "classes-data",
    "http://localhost:4000/classes/" + classId,
    { enabled: !!classId }
  );

  return (
    <div>
      <h2>Dependent Queries</h2>
      <h7>Show courses belonging to: {email}</h7>
      {!usersLoading && !classesLoading ? (
        <div>
          <h5>Classes taken by {user.data.name}:</h5>
          {calsses.data.courses.map((item, index) => (
            <div>{`${index + 1}. ${item}`}</div>
          ))}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default DependentQueries;
