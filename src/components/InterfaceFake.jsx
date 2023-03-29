import {Table} from "react-bootstrap"

export const InterfaceFake = (props) => {
  const renderEntry = () => {
    return props.fakeEntries.map((el, i) => {
      return (
        <tr>
          <th scope='row'>{i + 1}</th>
          <td>{el.id}</td>
          <td>{el.fullName}</td>
          <td>{el.city}</td>
          <td>{el.address}</td>
          <td>{el.phone}</td>
        </tr>
      );
    });
  };

  return (
      <article className='entries-parent' onScroll={props.scrollHandler}>
        <Table >
          <tr>
              <th>#</th>
              <th>Id</th>
              <th>Full name</th>
              <th>City</th>
              <th>Address</th>
              <th>Phone number</th>
          </tr>
        {renderEntry()}
        </Table>
      </article>
  );
};
