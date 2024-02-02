import React from 'react';

const UserDataComponent = ({ userData }) => {
  // This component will display the details of the selected user
  return (
    <div>
      <h2>User Details</h2>
      <table>
        {/* Display user details here based on the userData prop */}
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            {/* Add other user details */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userData.id}</td>
            <td>{userData.name}</td>
            {/* Add other user details */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDataComponent;
