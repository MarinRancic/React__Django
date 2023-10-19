import classes from "./UsersList.module.css";
import UsersListItem from "./UsersListItem";

const UsersList = (props) => {

  return (
    <div className={classes.user_list}>
      {props.users?.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          {props.users?.map((index) => (
            <UsersListItem
              key={index.id}
              id={index.id}
              username={index.username}
              has_adoption_request={index.has_adoption_request}
              has_donation={index.has_donation}
              email={index.email}
              address={index.address}
              phone_number={index.phone_number}
              role={index.role}
              verified={index.verified}
              getAllUsers={props.getAllUsers}
              messageHandler={props.messageHandler}
            />
          ))}
        </table>
      ) : (
        <p className={classes.no_items}>No items to display</p>
      )}
    </div>
  );
};

export default UsersList;
