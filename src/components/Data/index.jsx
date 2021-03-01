import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Header from '../shared/Header';
import axios from 'axios';

const Data = () => {
  const APILINK = 'https://jsonplaceholder.typicode.com/posts';

  const [data, setData] = useState([]);
  const posts = useMemo(() => data, [data]);
  useEffect(() => {
    axios.get(APILINK)
      .then(resp => setData(resp.data));
  }, []);

  const filter = event => {
    event.persist();
    const value = event.target.value;

    if (value.length === 0) {

      axios.get(APILINK)
        .then(resp => setData(resp.data));

    } else if (isNaN(value)) {
      const regex = new RegExp(value);

      axios.get(APILINK)
        .then(resp =>
          setData([...resp.data.filter(datum => (regex.test(datum.title) || regex.test(datum.body)))])
        );

    } else {
      const num = Number(value);

      axios.get(APILINK).then(resp =>
        setData([...data.filter(datum => (Number(datum.userId) === num || Number(datum.id) === num))])
      );
    }
  };

  // const sort = event => {
  //   event.persist();
  //   const { name, type } = event.target.dataset;

  //   let sorted;
  //   if (type === "int")
  //     sorted = data.sort((a, b) => Number(a[name]) - Number(b[name]));
  //   else
  //     sorted = data.sort((a, b) => {
  //       if (a[name].toLowerCase() < b[name].toLowerCase()) return -1;
  //       if (a[name].toLowerCase() > b[name].toLowerCase()) return 1;
  //       return 0;
  //     });

  //   if (order) {
  //     sorted = sorted.reverse();
  //     setOrder(false);
  //   } else {
  //     setOrder(true);
  //   }

  //   setData([...sorted]);
  // };

  return (
    <>
      <div className="container-fluid">
        <Header title="Your Data" />
      </div>
      <div className="container">
        <h2>Data Table</h2>
        <hr />
        <div className="row my-3 align-items-center justify-content-end">
          <div className="col-auto">
            <label htmlFor="filter" className="col-form-label">Filter</label>
          </div>

          <div className="col-auto">
            <input type="text" name="filter" className="form-control" onChange={filter} />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <td>id</td>
              <td>title</td>
              <td>body</td>

            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr key={i}>
                <td>
                  {post.id}.
                </td>
                <td>
                  {post.title}
                </td>
                <td>
                  {post.body}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Data;