import classes from "./DonationList.module.css";

const DonationList = (props) => {

  const dateFormating = (date) => {
    const datetime = new Date(date?.replace("Z", ""));
    const formattedDate = datetime.toLocaleDateString("en-GB");
    const formattedTime = datetime.toLocaleTimeString("en-GB");
    return(formattedDate + " " + formattedTime);
  }

  return (
    <div className={classes.adoption_requests_list}>
      {props.donations?.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Paypal Username</th>
              {props.donors !== "all" && <th>Times donated</th>}
              {props.donors === "all" ? <th>Amount</th> : <th>Total</th>}
              {props.donors === "all" && <th>Date</th>}
            </tr>
          </thead>
          {props.donations?.map((index) => (
            <tbody key={index.id}>
              <tr>
                <td><b>{index.username}</b><br/>{index.email}</td>
                <td>{index.paypal}</td>

                {props.donors !== "all" && <td>{index.count}</td>}
                {props.donors === "all" ? (
                  <td>{index.amount} €</td>
                ) : (
                  <td>{index.total} €</td>
                )}
                {props.donors === "all" && <td>{dateFormating(index.date)}</td>}
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <p className={classes.no_items}>No items to display</p>
      )}
    </div>
  );
};

export default DonationList;
